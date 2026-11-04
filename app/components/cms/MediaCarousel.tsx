import {Image} from '@shopify/hydrogen';
import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {CarouselFragment} from 'types/storefrontapi.generated';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  useCarousel,
} from '~/components/ui/carousel';
import {cn} from '~/lib/utils';
import TextField from './TextField';

type Slide = NonNullable<CarouselFragment['slides']>['references'] extends
  | {nodes: Array<infer N>}
  | null
  | undefined
  ? N
  : never;

interface MediaCarouselProps {
  reference: CarouselFragment;
  className?: string;
}

/**
 * Renders a `carousel` metaobject.
 * - layout "Top": heading above a row of media cards (e.g. Brands we've worked with)
 * - layout "Left": heading on the left, video cards on the right (e.g. Loved by athletes)
 */
function MediaCarousel({reference, className}: MediaCarouselProps) {
  const {top_heading, caption, header, label, layout, slides} = reference ?? {};
  const slidesArray = slides?.references?.nodes ?? [];
  const isLeft = layout?.value === 'Left';
  const [api, setApi] = useState<CarouselApi>();

  // Left layout: slides with a video, and the one open in the player
  const videoSlides = slidesArray.filter((s) => getVideoSrc(getMedia(s).video));
  const [openVideo, setOpenVideo] = useState<number | null>(null);

  // Open on the middle position so slides peek in on both sides
  // (Top: all sizes; Left: mobile only, desktop starts at the first slide)
  useEffect(() => {
    if (!api) return;
    if (isLeft && !window.matchMedia('(max-width: 767px)').matches) return;
    api.scrollTo(Math.floor(api.scrollSnapList().length / 2), true);
  }, [api, isLeft]);

  // Below lg, the centered slide plays its slideshow (no hover on touch)
  const [centeredSlide, setCenteredSlide] = useState<number | null>(null);
  useEffect(() => {
    if (!api || isLeft) return;
    const mql = window.matchMedia('(max-width: 1023px)');
    const update = () => {
      if (!mql.matches) return setCenteredSlide(null);
      // A snap can hold several slides at the edges; take its middle one
      const slides =
        api.internalEngine().slideRegistry[api.selectedScrollSnap()] ?? [];
      setCenteredSlide(slides[Math.floor(slides.length / 2)] ?? null);
    };
    update();
    api.on('select', update);
    api.on('reInit', update);
    mql.addEventListener('change', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
      mql.removeEventListener('change', update);
    };
  }, [api, isLeft]);

  if (slidesArray.length === 0) return null;

  return (
    <section className={cn('my-[60px] md:my-[100px]', className)}>
      {/* Top heading + caption: centered above the section in both layouts */}
      {(top_heading?.value || caption?.value) && (
        <div className="page-px text-center space-y-2 mb-8 md:mb-12">
          <TextField value={top_heading?.value} className="[&_p]:typo-h1" />
          <TextField value={caption?.value} />
        </div>
      )}

      <div
        className={cn(
          isLeft
            ? // Mobile: stacked, carousel full-bleed; md+: side by side
              'flex flex-col md:flex-row md:items-center gap-8 md:gap-12 md:px-6'
            : 'space-y-8 md:space-y-12',
        )}
      >
        {/* Header + label: centered (Top) or in the left column (Left) */}
        {(header?.value || label?.value) && (
          <div
            className={cn(
              'space-y-4',
              isLeft
                ? 'page-px md:px-0 md:w-1/4 shrink-0 text-center md:text-left'
                : 'page-px text-center',
            )}
          >
            <TextField value={header?.value} className="[&_p]:typo-h1" />
            <TextField value={label?.value} className="[&_p]:text-mid-grey" />
          </div>
        )}

        <Carousel
          opts={{
            align: 'center',
            loop: false,
            // Left layout aligns to the start once it's side by side
            breakpoints: isLeft ? {'(min-width: 768px)': {align: 'start'}} : {},
          }}
          className={cn('w-full', isLeft && 'md:flex-1 min-w-0')}
          setApi={setApi}
        >
          <CarouselContent className={cn(!isLeft && 'ml-0 md:ml-2')}>
            {slidesArray.map((slide, index) => (
              <CarouselItem
                key={slide.id ?? index}
                className={cn(
                  'pr-4',
                  isLeft
                    ? 'basis-2/3 md:basis-1/3 lg:basis-[22.22%]' // 4½ on desktop
                    : 'basis-2/3 md:basis-1/3 lg:basis-1/5',
                )}
              >
                {isLeft ? (
                  <VideoCard
                    slide={slide}
                    onOpen={
                      videoSlides.includes(slide)
                        ? () => setOpenVideo(videoSlides.indexOf(slide))
                        : undefined
                    }
                  />
                ) : (
                  <MediaCard slide={slide} active={centeredSlide === index} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Desktop - Top: arrows span from the 2nd to the 4th slide;
              Left: arrows span the first 2 slides, dots on the gap between them.
              Mobile: full row */}
          <CarouselNav
            className={cn(
              isLeft
                ? 'page-px md:px-0 lg:w-[44.44%]'
                : 'page-px lg:px-0 lg:w-2/5 lg:mx-auto',
            )}
          />
        </Carousel>
      </div>

      {openVideo !== null && (
        <VideoPlayerModal
          slides={videoSlides}
          index={openVideo}
          onChange={(index) => {
            setOpenVideo(index);
            api?.scrollTo(slidesArray.indexOf(videoSlides[index]));
          }}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </section>
  );
}

/** Arrow buttons at the edges with navigation dots in the middle. */
function CarouselNav({className}: {className?: string}) {
  const {api, scrollPrev, scrollNext, canScrollPrev, canScrollNext} =
    useCarousel();
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  if (snaps.length === 0) return null;

  return (
    <div className={cn('flex items-center justify-between mt-8', className)}>
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous slide"
        className="text-black disabled:text-[#D8D8D8] -scale-x-100 transition-colors"
      >
        <ArrowIcon />
      </button>

      <div className="flex items-center gap-2">
        {snaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selected}
            className={cn(
              'size-2 rounded-full transition-colors',
              index === selected ? 'bg-black' : 'bg-[#E5E5E5]',
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next slide"
        className="text-black disabled:text-[#D8D8D8] transition-colors"
      >
        <ArrowIcon />
      </button>
    </div>
  );
}

/** Right-pointing arrow; mirror it with -scale-x-100 for "previous". */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 64 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-10 lg:w-12 h-auto"
    >
      <path
        d="M63.277 24.6894C63.277 38.0488 52.447 48.8788 39.0876 48.8788C25.7282 48.8788 14.8982 38.0488 14.8982 24.6894C14.8982 11.33 25.7282 0.5 39.0876 0.5C52.447 0.5 63.277 11.33 63.277 24.6894Z"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 24.6895L0 25.1895L47.3788 25.1895V24.6895V24.1895L0 24.1895L0 24.6895ZM47.7323 25.043C47.9276 24.8477 47.9276 24.5312 47.7323 24.3359L44.5504 21.1539C44.3551 20.9587 44.0385 20.9587 43.8433 21.1539C43.648 21.3492 43.648 21.6658 43.8433 21.861L46.6717 24.6895L43.8433 27.5179C43.648 27.7131 43.648 28.0297 43.8433 28.225C44.0385 28.4202 44.3551 28.4202 44.5504 28.225L47.7323 25.043Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getMedia(slide: Slide) {
  const nodes = slide?.media?.references?.nodes ?? [];
  const image = nodes.find((n) => n.__typename === 'MediaImage');
  const video = nodes.find((n) => n.__typename === 'Video');
  return {
    image: image && 'image' in image ? image.image : null,
    video: video && 'sources' in video ? video : null,
  };
}

function getVideoSrc(video: ReturnType<typeof getMedia>['video']) {
  const sources = video?.sources ?? [];
  return (sources.find((s) => s.mimeType === 'video/mp4') ?? sources[0])?.url;
}

function Overlay({slide, hidden = false}: {slide: Slide; hidden?: boolean}) {
  if (slide?.show_overlay?.value !== 'true') return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-200"
      style={{
        backgroundColor: slide?.overlay_color?.value ?? '#000000',
        opacity: hidden ? 0 : Number(slide?.overlay_opacity?.value ?? 0.4),
      }}
    />
  );
}

const SLIDESHOW_INTERVAL_MS = 1500;
// First change happens right after the logo/overlay fade-out (duration-200)
const SLIDESHOW_FIRST_DELAY_MS = 200;

/**
 * Background image/video with optional overlay and a centered logo.
 * On mouse hover (desktop) or while it is the centered slide (`active`, below
 * lg) the overlay and logo fade out and, if the slide has more than one media
 * item, they cycle as a slideshow.
 */
function MediaCard({slide, active = false}: {slide: Slide; active?: boolean}) {
  const mediaItems = slide?.media?.references?.nodes ?? [];
  const logo = slide?.logo?.reference?.image;
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const playing = hovered || active;

  useEffect(() => {
    if (!playing) {
      setActiveIndex(0);
      return;
    }
    if (mediaItems.length <= 1) return;
    const next = () => setActiveIndex((i) => (i + 1) % mediaItems.length);
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      next();
      interval = setInterval(next, SLIDESHOW_INTERVAL_MS);
    }, SLIDESHOW_FIRST_DELAY_MS);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [playing, mediaItems.length]);

  return (
    <div
      className="relative aspect-[400/520] rounded-lg overflow-clip bg-[#e7e6e9] cursor-pointer"
      // Mouse only, so tapping/swiping on touch devices doesn't trigger it
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {mediaItems.map((item, index) => {
        const isActive = index === activeIndex;
        const className = cn(
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
          isActive ? 'opacity-100' : 'opacity-0',
        );

        if (item.__typename === 'Video' && 'sources' in item) {
          return (
            <video
              key={index}
              src={getVideoSrc(item)}
              poster={item.previewImage?.url}
              className={className}
              autoPlay
              muted
              loop
              playsInline
              preload={index === 0 ? 'auto' : 'none'}
            />
          );
        }

        if (item.__typename === 'MediaImage' && 'image' in item && item.image) {
          return (
            <Image
              key={index}
              data={item.image}
              width={400}
              height={520}
              className={className}
              loading={index === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          );
        }

        return null;
      })}
      <Overlay slide={slide} hidden={playing} />
      {logo && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center p-8 pointer-events-none transition-opacity duration-200',
            playing ? 'opacity-0' : 'opacity-100',
          )}
        >
          <Image
            data={logo}
            width={200}
            className="max-w-[60%] max-h-[30%] w-auto h-auto object-contain"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}

/** Video title + label on a bottom gradient. */
function VideoCaption({slide, className}: {slide: Slide; className?: string}) {
  if (!slide?.video_title?.value && !slide?.video_label?.value) return null;
  return (
    <div
      className={cn(
        'absolute inset-x-0 bottom-0 px-3 pb-4 pt-16 text-center text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none',
        className,
      )}
    >
      {slide?.video_title?.value && (
        <p className="font-semibold">{slide.video_title.value}</p>
      )}
      {slide?.video_label?.value && (
        <p className="typo-caption-responsive mt-0.5 opacity-90">
          {slide.video_label.value}
        </p>
      )}
    </div>
  );
}

/** Video preview card; clicking it opens the video in the player overlay. */
function VideoCard({slide, onOpen}: {slide: Slide; onOpen?: () => void}) {
  const {image, video} = getMedia(slide);
  const poster = video?.previewImage ?? image;

  return (
    <div className="relative aspect-[9/16] rounded-lg overflow-clip bg-black">
      {poster && (
        <Image
          data={poster}
          width={360}
          height={640}
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}
      <Overlay slide={slide} />
      {onOpen && (
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          aria-label={`Play ${slide?.video_title?.value ?? 'video'}`}
        >
          <svg
            viewBox="0 0 72 72"
            fill="none"
            className="size-14 lg:size-[72px] drop-shadow-md"
            aria-hidden="true"
          >
            <circle
              cx="35.8538"
              cy="35.8538"
              r="34.8538"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M54.1533 34.1217C55.4867 34.8915 55.4867 36.816 54.1533 37.5858L28.204 52.5676C26.8707 53.3374 25.204 52.3751 25.204 50.8355L25.204 20.8719C25.204 19.3323 26.8707 18.37 28.204 19.1398L54.1533 34.1217Z"
              fill="white"
            />
          </svg>
        </button>
      )}
      <VideoCaption slide={slide} />
    </div>
  );
}

/**
 * Full-screen video player shown on top of the page.
 * Up/down arrows, arrow keys and vertical swipes move between videos;
 * Esc, the close button or a click on the backdrop closes it.
 */
function VideoPlayerModal({
  slides,
  index,
  onChange,
  onClose,
}: {
  slides: Slide[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const slide = slides[index];
  const {video} = getMedia(slide);
  const videoSrc = getVideoSrc(video);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartY = useRef<number | null>(null);

  const hasPrev = index > 0;
  const hasNext = index < slides.length - 1;
  const goPrev = () => hasPrev && onChange(index - 1);
  const goNext = () => hasNext && onChange(index + 1);

  // Lock page scroll while open
  useEffect(() => {
    const {overflow} = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  // Keyboard: Esc closes, arrows move between videos
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Play each video from the start with sound; fall back to muted if the
  // browser blocks it
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    setProgress(0);
    setPaused(false);
    el.currentTime = 0;
    el.play().catch(() => {
      el.muted = true;
      setMuted(true);
      el.play().catch(() => setPaused(true));
    });
  }, [videoSrc]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * el.duration;
  };

  const iconButton =
    'flex items-center justify-center size-10 rounded-full text-white cursor-pointer';
  const navButton =
    'flex items-center justify-center size-12 rounded-full bg-black/60 border border-white/80 text-white cursor-pointer disabled:opacity-30 disabled:cursor-default';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide?.video_title?.value ?? 'Video'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 md:p-6"
      onClick={onClose}
      onTouchStart={(e) => (touchStartY.current = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (touchStartY.current === null) return;
        const delta = touchStartY.current - e.changedTouches[0].clientY;
        touchStartY.current = null;
        if (delta > 60) goNext();
        if (delta < -60) goPrev();
      }}
    >
      <div
        className="relative h-full w-full md:h-[90vh] md:w-auto md:aspect-[9/16] md:max-w-[420px] bg-black md:rounded-xl overflow-clip"
        onClick={(e) => e.stopPropagation()}
      >
        {videoSrc && (
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            poster={video?.previewImage?.url}
            className="w-full h-full object-cover"
            playsInline
            loop
            onClick={togglePlay}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onTimeUpdate={(e) => {
              const {currentTime, duration} = e.currentTarget;
              setProgress(duration ? currentTime / duration : 0);
            }}
          />
        )}

        {/* Top bar: progress, play/pause, mute, close */}
        <div className="absolute inset-x-0 top-0 px-3 pt-3 pb-8 bg-gradient-to-b from-black/50 to-transparent">
          <div
            className="relative h-4 flex items-center cursor-pointer"
            onClick={seek}
          >
            <div className="h-[3px] w-full rounded-full bg-white/40">
              <div
                className="h-full rounded-full bg-white"
                style={{width: `${progress * 100}%`}}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <button
              type="button"
              onClick={togglePlay}
              className={iconButton}
              aria-label={paused ? 'Play' : 'Pause'}
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
                {paused ? (
                  <path d="M8 5v14l11-7z" />
                ) : (
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                )}
              </svg>
            </button>
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleMute}
                className={iconButton}
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
                  <path d="M4 9v6h4l5 4V5L8 9H4z" />
                  {muted ? (
                    <path
                      d="M16 9l5 6M21 9l-5 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  )}
                </svg>
              </button>
              <button
                type="button"
                onClick={onClose}
                className={iconButton}
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <VideoCaption slide={slide} className="pb-8" />
      </div>

      {/* Previous / next: beside the player on desktop, hidden on mobile
          (swipe up/down instead) */}
      <div
        className="hidden md:flex flex-col justify-between self-stretch py-[5vh] ml-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={!hasPrev}
          className={navButton}
          aria-label="Previous video"
        >
          <ChevronIcon className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!hasNext}
          className={navButton}
          aria-label="Next video"
        >
          <ChevronIcon />
        </button>
      </div>
    </div>,
    document.body,
  );
}

/** Downward arrow. */
function ChevronIcon({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-6', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v16M5 13l7 7 7-7" />
    </svg>
  );
}

export default MediaCarousel;
