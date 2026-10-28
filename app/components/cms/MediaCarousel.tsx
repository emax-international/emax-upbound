import {Image, RichText} from '@shopify/hydrogen';
import {useRef, useState} from 'react';
import {CarouselFragment} from 'types/storefrontapi.generated';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import {cn} from '~/lib/utils';

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
  const {title, header, label, layout, slides} = reference ?? {};
  const slidesArray = slides?.references?.nodes ?? [];
  const isLeft = layout?.value === 'Left';

  if (slidesArray.length === 0) return null;

  const heading = (
    <div className={cn('space-y-2', isLeft ? 'text-left' : 'text-center')}>
      {header?.value ? (
        <RichText data={header.value} className="typo-header" />
      ) : (
        title?.value && <h2 className="typo-header">{title.value}</h2>
      )}
      {label?.value && (
        <RichText data={label.value} className="text-mid-grey" />
      )}
    </div>
  );

  return (
    <section
      className={cn(
        'my-[60px] md:my-[100px]',
        isLeft
          ? 'page-px flex flex-col md:flex-row md:items-center gap-8 md:gap-12'
          : 'space-y-8 md:space-y-12',
        className,
      )}
    >
      <div className={cn(isLeft ? 'md:w-1/3 shrink-0' : 'page-px')}>
        {heading}
      </div>

      <Carousel
        opts={{align: isLeft ? 'start' : 'center', loop: false}}
        className={cn('w-full', isLeft && 'md:w-2/3 min-w-0')}
      >
        <CarouselContent className={cn(!isLeft && 'ml-0 md:ml-2')}>
          {slidesArray.map((slide, index) => (
            <CarouselItem
              key={slide.id ?? index}
              className={cn(
                'pr-4',
                isLeft
                  ? 'basis-1/2 lg:basis-1/3'
                  : 'basis-2/3 md:basis-1/3 lg:basis-1/4',
              )}
            >
              {isLeft ? (
                <VideoCard slide={slide} />
              ) : (
                <MediaCard slide={slide} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center items-center gap-2 mt-8">
          <CarouselPrevious className="translate-none" />
          <CarouselNext className="translate-none" />
        </div>
      </Carousel>
    </section>
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

function Overlay({slide}: {slide: Slide}) {
  if (slide?.show_overlay?.value !== 'true') return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundColor: slide?.overlay_color?.value ?? '#000000',
        opacity: Number(slide?.overlay_opacity?.value ?? 0.4),
      }}
    />
  );
}

/** Background image/video with optional overlay and a centered logo. */
function MediaCard({slide}: {slide: Slide}) {
  const {image, video} = getMedia(slide);
  const logo = slide?.logo?.reference?.image;
  const videoSrc = getVideoSrc(video);

  return (
    <div className="relative aspect-[400/520] rounded-lg overflow-clip bg-[#e7e6e9]">
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={video?.previewImage?.url}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        image && (
          <Image
            data={image}
            width={400}
            height={520}
            className="w-full h-full object-cover"
            draggable={false}
          />
        )
      )}
      <Overlay slide={slide} />
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
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

/** Video card with a play button and title/label at the bottom. */
function VideoCard({slide}: {slide: Slide}) {
  const {image, video} = getMedia(slide);
  const videoSrc = getVideoSrc(video);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    void videoRef.current?.play();
  };

  return (
    <div className="relative aspect-[9/16] rounded-lg overflow-clip bg-black">
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={video?.previewImage?.url ?? image?.url}
          className="w-full h-full object-cover"
          controls={playing}
          playsInline
          preload="metadata"
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : (
        image && (
          <Image
            data={image}
            width={360}
            height={640}
            className="w-full h-full object-cover"
            draggable={false}
          />
        )
      )}

      {!playing && (
        <>
          <Overlay slide={slide} />
          {videoSrc && (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${slide?.video_title?.value ?? 'video'}`}
            >
              <span className="flex items-center justify-center size-14 rounded-full bg-white/80 backdrop-blur">
                <svg viewBox="0 0 24 24" className="size-6 ml-1" fill="black">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
          {(slide?.video_title?.value || slide?.video_label?.value) && (
            <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white pointer-events-none">
              {slide?.video_label?.value && (
                <p className="typo-caption-responsive">
                  {slide.video_label.value}
                </p>
              )}
              {slide?.video_title?.value && (
                <p className="text-xl font-semibold">
                  {slide.video_title.value}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MediaCarousel;
