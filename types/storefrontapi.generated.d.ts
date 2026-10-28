/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type AccountPageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type AccountPageCmsQuery = {
  accountHero?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle' | 'type'> & {
      title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      hero_image?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
    }
  >;
};

export type BlogPostsByHandleQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type BlogPostsByHandleQuery = {
  blog?: StorefrontAPI.Maybe<{
    articles: {
      nodes: Array<
        Pick<
          StorefrontAPI.Article,
          'id' | 'handle' | 'title' | 'excerpt' | 'contentHtml' | 'tags'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
          caption?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'type' | 'value'>
          >;
        }
      >;
    };
  }>;
};

export type BlogArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type BlogArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Article,
          | 'handle'
          | 'title'
          | 'contentHtml'
          | 'publishedAt'
          | 'tags'
          | 'excerpt'
        > & {
          author?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ArticleAuthor, 'name'>
          >;
          author_name?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'description' | 'title'>
          >;
          caption?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'type' | 'value'>
          >;
        }
      >;
    }
  >;
};

export type CommunityPageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type CommunityPageCmsQuery = {
  communityPage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle' | 'type'> & {
      title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      hero_image?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
      description?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      grid_title?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      grid_description?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }
  >;
};

export type FaqPageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type FaqPageCmsQuery = {
  faqPage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      contents?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              collapsible?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              iconVariant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              numberedContent?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              variant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              content?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type FooterMenuCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type FooterMenuCmsQuery = {
  footerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      groups?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              items?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      internalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      externalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      icon?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                    }
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type GlobalBannerCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type GlobalBannerCmsQuery = {
  globalBanners: {
    nodes: Array<
      Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
        display?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        content?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  };
};

export type GlobalNewsletterPopupCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type GlobalNewsletterPopupCmsQuery = {
  globalNewsletterPopup?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      display?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      image?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
      title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      description?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      caption?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }
  >;
};

export type HomePageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type HomePageCmsQuery = {
  homePage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      modules?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              description?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              desktopImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              mobileImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              cta?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metaobject, 'type'> & {
                    label?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    internalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    externalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    iconVariant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }
                >;
              }>;
              subtitle?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cards?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    mixBlend?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    image?: StorefrontAPI.Maybe<{
                      reference?: StorefrontAPI.Maybe<{
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'height' | 'width' | 'url' | 'altText'
                          >
                        >;
                      }>;
                    }>;
                    internalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    variant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    tags?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
              }>;
              mobileLayout?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              collapsible?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              iconVariant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              numberedContent?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              variant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              content?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
              }>;
              platformLogos?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
              }>;
              featuredProduct?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Product,
                    'id' | 'handle' | 'title' | 'description' | 'productType'
                  > & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'altText' | 'id' | 'url' | 'height' | 'width'
                      >
                    >;
                    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.ProductVariant,
                        'id' | 'availableForSale'
                      > & {
                        price: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      }
                    >;
                  }
                >;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type LabPageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type LabPageCmsQuery = {
  paceLabPage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      header_feature?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      hero_with_text?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            background_image?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url' | 'altText'>
                >;
              }>;
            }>;
            enable_overlay?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            overlay_opacity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            logo?: StorefrontAPI.Maybe<{
              references?: StorefrontAPI.Maybe<{
                nodes: Array<{
                  image?: StorefrontAPI.Maybe<{
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url' | 'altText'>
                      >;
                    }>;
                  }>;
                }>;
              }>;
            }>;
            texts?: StorefrontAPI.Maybe<{
              references?: StorefrontAPI.Maybe<{
                nodes: Array<{
                  text?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  position?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  font_size?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  font_weight?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  text_color?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  tag?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  label?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  listing?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
            }>;
          }
        >;
      }>;
      text?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            label?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            description?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            header?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            listing?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            footer?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }
        >;
      }>;
      banner?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            background_image?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url' | 'altText'>
                >;
              }>;
            }>;
            enable_overlay?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            overlay_opacity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            logo?: StorefrontAPI.Maybe<{
              references?: StorefrontAPI.Maybe<{
                nodes: Array<{
                  image?: StorefrontAPI.Maybe<{
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url' | 'altText'>
                      >;
                    }>;
                  }>;
                }>;
              }>;
            }>;
            texts?: StorefrontAPI.Maybe<{
              references?: StorefrontAPI.Maybe<{
                nodes: Array<{
                  text?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  position?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  font_size?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  font_weight?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  text_color?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  tag?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  label?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  listing?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
            }>;
          }
        >;
      }>;
      description?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            label?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            description?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            header?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            listing?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            footer?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }
        >;
      }>;
      question_title?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            title?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            collapsible?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            iconVariant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            numberedContent?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            variant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            content?: StorefrontAPI.Maybe<{
              references?: StorefrontAPI.Maybe<{
                nodes: Array<{
                  title?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  description?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
            }>;
          }
        >;
      }>;
      gallery?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            shape?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            desktopImage?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'height' | 'width' | 'url' | 'altText'
                  >
                >;
              }>;
            }>;
            mobileImage?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'height' | 'width' | 'url' | 'altText'
                  >
                >;
              }>;
            }>;
          }
        >;
      }>;
      sign_up?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            title?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            description?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            cta?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metaobject, 'type'> & {
                  label?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  internalUrl?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  externalUrl?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  iconVariant?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }
              >;
            }>;
          }
        >;
      }>;
      steps?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            title?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            title_position?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            footer?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            footer_position?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            position?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            text_color?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            tag?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            background_image?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url' | 'altText'>
                >;
              }>;
            }>;
            steps?: StorefrontAPI.Maybe<{
              references?: StorefrontAPI.Maybe<{
                nodes: Array<{
                  step?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  step_text_color?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  step_body_color?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  description?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  description_text_color?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  description_body_color?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }>;
              }>;
            }>;
          }
        >;
      }>;
      schedule?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              image?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url' | 'altText'>
                  >;
                }>;
              }>;
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              label?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
      proof?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              shape?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              desktopImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              mobileImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
      modules?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              description?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              desktopImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              mobileImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              cta?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metaobject, 'type'> & {
                    label?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    internalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    externalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    iconVariant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }
                >;
              }>;
              subtitle?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cards?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    mixBlend?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    image?: StorefrontAPI.Maybe<{
                      reference?: StorefrontAPI.Maybe<{
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'height' | 'width' | 'url' | 'altText'
                          >
                        >;
                      }>;
                    }>;
                    internalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    variant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    tags?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
              }>;
              mobileLayout?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              collapsible?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              iconVariant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              numberedContent?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              variant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              content?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
              }>;
              platformLogos?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
              }>;
              featuredProduct?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Product,
                    'id' | 'handle' | 'title' | 'description' | 'productType'
                  > & {
                    featuredImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'altText' | 'id' | 'url' | 'height' | 'width'
                      >
                    >;
                    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.ProductVariant,
                        'id' | 'availableForSale'
                      > & {
                        price: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      }
                    >;
                  }
                >;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type HeroWithCtaFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  desktopImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
};

export type TextWithCtaFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
};

export type ImageCarouselFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  subtitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
  cards?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        title?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        description?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        mixBlend?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        image?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
            >;
          }>;
        }>;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        variant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        tags?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }>;
    }>;
  }>;
  mobileLayout?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
};

export type AccordionFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  collapsible?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  iconVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  numberedContent?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  variant?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  content?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        title?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        description?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }>;
    }>;
  }>;
};

export type ScienceHeroFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  subtitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  hero_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type AccountHeroFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  hero_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type CommunityHeroFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  hero_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  grid_title?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  grid_description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
};

export type HeroImageWithProductFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  desktopImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  featuredProduct?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'description' | 'productType'
      > & {
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          }
        >;
      }
    >;
  }>;
};

export type HeroFeaturedProductFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  platformLogos?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
        >;
      }>;
    }>;
  }>;
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  featuredProduct?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title' | 'description' | 'productType'
      > & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'altText' | 'id' | 'url' | 'height' | 'width'
          >
        >;
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'>
        >;
      }
    >;
  }>;
  desktopImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type GalleryImageCardFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  shape?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  desktopImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type FounderCardFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type ProductEndorsementCardFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  name?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  position?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type CustomMenuItemFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  internalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  externalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  icon?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type FooterMenuGroupFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  items?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          internalUrl?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          externalUrl?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          icon?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
        }
      >;
    }>;
  }>;
};

export type HeroImageMultiTextFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  background_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
    }>;
  }>;
  enable_overlay?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  overlay_opacity?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  logo?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        image?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText'>
            >;
          }>;
        }>;
      }>;
    }>;
  }>;
  texts?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        text?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        position?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        font_size?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        font_weight?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        text_color?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        tag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        listing?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }>;
    }>;
  }>;
};

export type TextBlockFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  header?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  listing?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  footer?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type GalleryRowsFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
    }>;
  }>;
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type StoreOutletFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  area?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  name?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  map_url?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  address?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type StoreLocationFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  store_name?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  store_logo?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
    }>;
  }>;
  more_than_1_location?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  address?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  map_url?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  outlets?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          area?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          name?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          map_url?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          address?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
        }
      >;
    }>;
  }>;
};

export type StoreLocatorHeroFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  hero_header?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  hero_text_position?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  hero_text_color?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  hero_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type StoreTypeFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  type_name?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  store_list?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          store_name?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          store_logo?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Image, 'url' | 'altText'>
              >;
            }>;
          }>;
          more_than_1_location?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          address?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          map_url?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          outlets?: StorefrontAPI.Maybe<{
            references?: StorefrontAPI.Maybe<{
              nodes: Array<
                Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                  area?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  name?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  map_url?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  address?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }
              >;
            }>;
          }>;
        }
      >;
    }>;
  }>;
};

export type BannerStepsFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  title_position?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  footer?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  footer_position?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  position?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  text_color?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  tag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  background_image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url' | 'altText'>>;
    }>;
  }>;
  steps?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        step?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        step_text_color?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        step_body_color?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        description?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        description_text_color?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        description_body_color?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }>;
    }>;
  }>;
};

export type OurStoryPageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type OurStoryPageCmsQuery = {
  ourStoryPage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      desktopImage?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
      mobileImage?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
      founderQuote?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      quoteCaption?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      founderCard?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            title?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            description?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            image?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'height' | 'width' | 'url' | 'altText'
                  >
                >;
              }>;
            }>;
          }
        >;
      }>;
      gallery?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              shape?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              desktopImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              mobileImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
      modules?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              collapsible?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              iconVariant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              numberedContent?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              variant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              content?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type FounderBlogArticleQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type FounderBlogArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Article, 'title' | 'contentHtml'>
      >;
    }
  >;
};

export type SciencePageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type SciencePageCmsQuery = {
  sciencePage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle' | 'type'> & {
      title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      subtitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      description?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      hero_image?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
    }
  >;
};

export type StoreLocatorPageCmsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type StoreLocatorPageCmsQuery = {
  storeLocatorPage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle' | 'type'> & {
      category?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              type_name?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              store_list?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      store_name?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      store_logo?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.Image, 'url' | 'altText'>
                          >;
                        }>;
                      }>;
                      more_than_1_location?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      address?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      map_url?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      outlets?: StorefrontAPI.Maybe<{
                        references?: StorefrontAPI.Maybe<{
                          nodes: Array<
                            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                              area?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.MetaobjectField, 'value'>
                              >;
                              name?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.MetaobjectField, 'value'>
                              >;
                              map_url?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.MetaobjectField, 'value'>
                              >;
                              address?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.MetaobjectField, 'value'>
                              >;
                            }
                          >;
                        }>;
                      }>;
                    }
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
      hero_header?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      hero_text_position?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      hero_text_color?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      hero_image?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
    }
  >;
};

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  sellingPlanAllocation?: StorefrontAPI.Maybe<{
    sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
  }>;
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  sellingPlanAllocation?: StorefrontAPI.Maybe<{
    sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
  }>;
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, 'lastCharacters'> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    }
  >;
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          sellingPlanAllocation?: StorefrontAPI.Maybe<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
          }>;
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          sellingPlanAllocation?: StorefrontAPI.Maybe<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, 'name'>;
          }>;
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FooterQuery = {
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type MoneyProductItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type ProductItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title' | 'productType' | 'totalInventory'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  compareAtPriceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, 'id' | 'title' | 'availableForSale'> & {
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      freeGift?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
    }
  >;
};

export type CollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      products: {
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            'id' | 'handle' | 'title' | 'productType' | 'totalInventory'
          > & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              maxVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            compareAtPriceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              maxVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'title' | 'availableForSale'
              > & {
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                freeGift?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metafield, 'value'>
                >;
              }
            >;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type CollectionFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
  >;
};

export type StoreCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoreCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type MoneyCollectionItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type CollectionItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title' | 'tags' | 'productType'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  compareAtPriceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, 'id' | 'title' | 'availableForSale'> & {
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      freeGift?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
    }
  >;
};

export type CatalogQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CatalogQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'handle' | 'title' | 'tags' | 'productType'
      > & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'title' | 'availableForSale'
          > & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            freeGift?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'value'>
            >;
          }
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type StoreCollectionHandlesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoreCollectionHandlesQuery = {
  collections: {
    nodes: Array<Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'>>;
  };
};

export type PageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'handle' | 'id' | 'title' | 'body'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type ProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'availableForSale' | 'id' | 'sku' | 'title'
> & {
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  image?: StorefrontAPI.Maybe<
    {__typename: 'Image'} & Pick<
      StorefrontAPI.Image,
      'id' | 'url' | 'altText' | 'width' | 'height'
    >
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  unitsPerPack?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  freeGift?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'> & {
      references?: StorefrontAPI.Maybe<{
        nodes: Array<
          Pick<StorefrontAPI.ProductVariant, 'id'> & {
            product: Pick<StorefrontAPI.Product, 'title'> & {
              sizeChart?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
                }>;
              }>;
            };
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          }
        >;
      }>;
    }
  >;
  freeGiftSubscription?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'> & {
      references?: StorefrontAPI.Maybe<{
        nodes: Array<
          Pick<StorefrontAPI.ProductVariant, 'id'> & {
            product: Pick<StorefrontAPI.Product, 'title'> & {
              sizeChart?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
                }>;
              }>;
            };
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          }
        >;
      }>;
    }
  >;
  sellingPlanAllocations: {
    nodes: Array<{
      sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
      priceAdjustments: Array<{
        compareAtPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        perDeliveryPrice: Pick<
          StorefrontAPI.MoneyV2,
          'amount' | 'currencyCode'
        >;
      }>;
    }>;
  };
};

export type SellingPlanMoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type SellingPlanFragment = Pick<
  StorefrontAPI.SellingPlan,
  'id' | 'recurringDeliveries'
> & {
  options: Array<Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>>;
  priceAdjustments: Array<
    Pick<StorefrontAPI.SellingPlanPriceAdjustment, 'orderCount'> & {
      adjustmentValue:
        | ({__typename: 'SellingPlanFixedAmountPriceAdjustment'} & {
            adjustmentAmount: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
          })
        | ({__typename: 'SellingPlanFixedPriceAdjustment'} & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          })
        | ({__typename: 'SellingPlanPercentagePriceAdjustment'} & Pick<
            StorefrontAPI.SellingPlanPercentagePriceAdjustment,
            'adjustmentPercentage'
          >);
    }
  >;
  checkoutCharge: Pick<StorefrontAPI.SellingPlanCheckoutCharge, 'type'> & {
    value:
      | Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      | Pick<
          StorefrontAPI.SellingPlanCheckoutChargePercentageValue,
          'percentage'
        >;
  };
};

export type SellingPlanGroupFragment = Pick<
  StorefrontAPI.SellingPlanGroup,
  'name'
> & {
  options: Array<Pick<StorefrontAPI.SellingPlanGroupOption, 'name' | 'values'>>;
  sellingPlans: {
    nodes: Array<
      Pick<StorefrontAPI.SellingPlan, 'id' | 'recurringDeliveries'> & {
        options: Array<Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>>;
        priceAdjustments: Array<
          Pick<StorefrontAPI.SellingPlanPriceAdjustment, 'orderCount'> & {
            adjustmentValue:
              | ({__typename: 'SellingPlanFixedAmountPriceAdjustment'} & {
                  adjustmentAmount: Pick<
                    StorefrontAPI.MoneyV2,
                    'amount' | 'currencyCode'
                  >;
                })
              | ({__typename: 'SellingPlanFixedPriceAdjustment'} & {
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                })
              | ({__typename: 'SellingPlanPercentagePriceAdjustment'} & Pick<
                  StorefrontAPI.SellingPlanPercentagePriceAdjustment,
                  'adjustmentPercentage'
                >);
          }
        >;
        checkoutCharge: Pick<
          StorefrontAPI.SellingPlanCheckoutCharge,
          'type'
        > & {
          value:
            | Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            | Pick<
                StorefrontAPI.SellingPlanCheckoutChargePercentageValue,
                'percentage'
              >;
        };
      }
    >;
  };
};

export type ProductFragment = Pick<
  StorefrontAPI.Product,
  | 'id'
  | 'handle'
  | 'title'
  | 'productType'
  | 'tags'
  | 'vendor'
  | 'descriptionHtml'
  | 'description'
  | 'encodedVariantExistence'
  | 'encodedVariantAvailability'
> & {
  options: Array<
    Pick<StorefrontAPI.ProductOption, 'name'> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
          firstSelectableVariant?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.ProductVariant,
              'availableForSale' | 'id' | 'sku' | 'title'
            > & {
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              image?: StorefrontAPI.Maybe<
                {__typename: 'Image'} & Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              unitsPerPack?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metafield, 'value'>
              >;
              freeGift?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metafield, 'value'> & {
                  references?: StorefrontAPI.Maybe<{
                    nodes: Array<
                      Pick<StorefrontAPI.ProductVariant, 'id'> & {
                        product: Pick<StorefrontAPI.Product, 'title'> & {
                          sizeChart?: StorefrontAPI.Maybe<{
                            reference?: StorefrontAPI.Maybe<{
                              image?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.Image, 'url'>
                              >;
                            }>;
                          }>;
                        };
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                        selectedOptions: Array<
                          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                        >;
                      }
                    >;
                  }>;
                }
              >;
              freeGiftSubscription?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metafield, 'value'> & {
                  references?: StorefrontAPI.Maybe<{
                    nodes: Array<
                      Pick<StorefrontAPI.ProductVariant, 'id'> & {
                        product: Pick<StorefrontAPI.Product, 'title'> & {
                          sizeChart?: StorefrontAPI.Maybe<{
                            reference?: StorefrontAPI.Maybe<{
                              image?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.Image, 'url'>
                              >;
                            }>;
                          }>;
                        };
                        image?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'url' | 'altText' | 'width' | 'height'
                          >
                        >;
                        selectedOptions: Array<
                          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                        >;
                      }
                    >;
                  }>;
                }
              >;
              sellingPlanAllocations: {
                nodes: Array<{
                  sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
                  priceAdjustments: Array<{
                    compareAtPrice: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                    price: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                    perDeliveryPrice: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                  }>;
                }>;
              };
            }
          >;
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
              image?: StorefrontAPI.Maybe<{
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              }>;
            }
          >;
        }
      >;
    }
  >;
  images: {
    nodes: Array<
      Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
    >;
  };
  sellingPlanGroups: {
    nodes: Array<
      Pick<StorefrontAPI.SellingPlanGroup, 'name'> & {
        options: Array<
          Pick<StorefrontAPI.SellingPlanGroupOption, 'name' | 'values'>
        >;
        sellingPlans: {
          nodes: Array<
            Pick<StorefrontAPI.SellingPlan, 'id' | 'recurringDeliveries'> & {
              options: Array<
                Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
              >;
              priceAdjustments: Array<
                Pick<StorefrontAPI.SellingPlanPriceAdjustment, 'orderCount'> & {
                  adjustmentValue:
                    | ({__typename: 'SellingPlanFixedAmountPriceAdjustment'} & {
                        adjustmentAmount: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      })
                    | ({__typename: 'SellingPlanFixedPriceAdjustment'} & {
                        price: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      })
                    | ({
                        __typename: 'SellingPlanPercentagePriceAdjustment';
                      } & Pick<
                        StorefrontAPI.SellingPlanPercentagePriceAdjustment,
                        'adjustmentPercentage'
                      >);
                }
              >;
              checkoutCharge: Pick<
                StorefrontAPI.SellingPlanCheckoutCharge,
                'type'
              > & {
                value:
                  | Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  | Pick<
                      StorefrontAPI.SellingPlanCheckoutChargePercentageValue,
                      'percentage'
                    >;
              };
            }
          >;
        };
      }
    >;
  };
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      unitsPerPack?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      freeGift?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'> & {
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, 'id'> & {
                product: Pick<StorefrontAPI.Product, 'title'> & {
                  sizeChart?: StorefrontAPI.Maybe<{
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    }>;
                  }>;
                };
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
              }
            >;
          }>;
        }
      >;
      freeGiftSubscription?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'> & {
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, 'id'> & {
                product: Pick<StorefrontAPI.Product, 'title'> & {
                  sizeChart?: StorefrontAPI.Maybe<{
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    }>;
                  }>;
                };
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
              }
            >;
          }>;
        }
      >;
      sellingPlanAllocations: {
        nodes: Array<{
          sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
          priceAdjustments: Array<{
            compareAtPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            perDeliveryPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
          }>;
        }>;
      };
    }
  >;
  adjacentVariants: Array<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      unitsPerPack?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      freeGift?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'> & {
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, 'id'> & {
                product: Pick<StorefrontAPI.Product, 'title'> & {
                  sizeChart?: StorefrontAPI.Maybe<{
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    }>;
                  }>;
                };
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
              }
            >;
          }>;
        }
      >;
      freeGiftSubscription?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'> & {
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, 'id'> & {
                product: Pick<StorefrontAPI.Product, 'title'> & {
                  sizeChart?: StorefrontAPI.Maybe<{
                    reference?: StorefrontAPI.Maybe<{
                      image?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    }>;
                  }>;
                };
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
              }
            >;
          }>;
        }
      >;
      sellingPlanAllocations: {
        nodes: Array<{
          sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
          priceAdjustments: Array<{
            compareAtPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            perDeliveryPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
          }>;
        }>;
      };
    }
  >;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  selectedOptions:
    | Array<StorefrontAPI.SelectedOptionInput>
    | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'handle'
      | 'title'
      | 'productType'
      | 'tags'
      | 'vendor'
      | 'descriptionHtml'
      | 'description'
      | 'encodedVariantExistence'
      | 'encodedVariantAvailability'
    > & {
      variants: {
        nodes: Array<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'title'> & {
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
            metafield?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'type' | 'value'>
            >;
            sellingPlanAllocations: {
              nodes: Array<{
                sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
              }>;
            };
          }
        >;
      };
      howToConsume?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'type' | 'value'>
      >;
      ingredients?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'type' | 'value'>
      >;
      certifiedLogos?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<{
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
            >;
          }>;
        }>;
      }>;
      accordion?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'type'> & {
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              collapsible?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              iconVariant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              numberedContent?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              variant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              content?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }>;
                }>;
              }>;
            }
          >;
        }
      >;
      productEndorsements?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'type'> & {
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                description?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                name?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                position?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                image?: StorefrontAPI.Maybe<{
                  reference?: StorefrontAPI.Maybe<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
              }
            >;
          }>;
        }
      >;
      options: Array<
        Pick<StorefrontAPI.ProductOption, 'name'> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
              firstSelectableVariant?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'availableForSale' | 'id' | 'sku' | 'title'
                > & {
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  image?: StorefrontAPI.Maybe<
                    {__typename: 'Image'} & Pick<
                      StorefrontAPI.Image,
                      'id' | 'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  unitsPerPack?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Metafield, 'value'>
                  >;
                  freeGift?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Metafield, 'value'> & {
                      references?: StorefrontAPI.Maybe<{
                        nodes: Array<
                          Pick<StorefrontAPI.ProductVariant, 'id'> & {
                            product: Pick<StorefrontAPI.Product, 'title'> & {
                              sizeChart?: StorefrontAPI.Maybe<{
                                reference?: StorefrontAPI.Maybe<{
                                  image?: StorefrontAPI.Maybe<
                                    Pick<StorefrontAPI.Image, 'url'>
                                  >;
                                }>;
                              }>;
                            };
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            selectedOptions: Array<
                              Pick<
                                StorefrontAPI.SelectedOption,
                                'name' | 'value'
                              >
                            >;
                          }
                        >;
                      }>;
                    }
                  >;
                  freeGiftSubscription?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Metafield, 'value'> & {
                      references?: StorefrontAPI.Maybe<{
                        nodes: Array<
                          Pick<StorefrontAPI.ProductVariant, 'id'> & {
                            product: Pick<StorefrontAPI.Product, 'title'> & {
                              sizeChart?: StorefrontAPI.Maybe<{
                                reference?: StorefrontAPI.Maybe<{
                                  image?: StorefrontAPI.Maybe<
                                    Pick<StorefrontAPI.Image, 'url'>
                                  >;
                                }>;
                              }>;
                            };
                            image?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Image,
                                'url' | 'altText' | 'width' | 'height'
                              >
                            >;
                            selectedOptions: Array<
                              Pick<
                                StorefrontAPI.SelectedOption,
                                'name' | 'value'
                              >
                            >;
                          }
                        >;
                      }>;
                    }
                  >;
                  sellingPlanAllocations: {
                    nodes: Array<{
                      sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
                      priceAdjustments: Array<{
                        compareAtPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                        price: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                        perDeliveryPrice: Pick<
                          StorefrontAPI.MoneyV2,
                          'amount' | 'currencyCode'
                        >;
                      }>;
                    }>;
                  };
                }
              >;
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
                  image?: StorefrontAPI.Maybe<{
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url'>
                    >;
                  }>;
                }
              >;
            }
          >;
        }
      >;
      images: {
        nodes: Array<
          Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
        >;
      };
      sellingPlanGroups: {
        nodes: Array<
          Pick<StorefrontAPI.SellingPlanGroup, 'name'> & {
            options: Array<
              Pick<StorefrontAPI.SellingPlanGroupOption, 'name' | 'values'>
            >;
            sellingPlans: {
              nodes: Array<
                Pick<
                  StorefrontAPI.SellingPlan,
                  'id' | 'recurringDeliveries'
                > & {
                  options: Array<
                    Pick<StorefrontAPI.SellingPlanOption, 'name' | 'value'>
                  >;
                  priceAdjustments: Array<
                    Pick<
                      StorefrontAPI.SellingPlanPriceAdjustment,
                      'orderCount'
                    > & {
                      adjustmentValue:
                        | ({
                            __typename: 'SellingPlanFixedAmountPriceAdjustment';
                          } & {
                            adjustmentAmount: Pick<
                              StorefrontAPI.MoneyV2,
                              'amount' | 'currencyCode'
                            >;
                          })
                        | ({__typename: 'SellingPlanFixedPriceAdjustment'} & {
                            price: Pick<
                              StorefrontAPI.MoneyV2,
                              'amount' | 'currencyCode'
                            >;
                          })
                        | ({
                            __typename: 'SellingPlanPercentagePriceAdjustment';
                          } & Pick<
                            StorefrontAPI.SellingPlanPercentagePriceAdjustment,
                            'adjustmentPercentage'
                          >);
                    }
                  >;
                  checkoutCharge: Pick<
                    StorefrontAPI.SellingPlanCheckoutCharge,
                    'type'
                  > & {
                    value:
                      | Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                      | Pick<
                          StorefrontAPI.SellingPlanCheckoutChargePercentageValue,
                          'percentage'
                        >;
                  };
                }
              >;
            };
          }
        >;
      };
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          unitsPerPack?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          freeGift?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'> & {
              references?: StorefrontAPI.Maybe<{
                nodes: Array<
                  Pick<StorefrontAPI.ProductVariant, 'id'> & {
                    product: Pick<StorefrontAPI.Product, 'title'> & {
                      sizeChart?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.Image, 'url'>
                          >;
                        }>;
                      }>;
                    };
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                    selectedOptions: Array<
                      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                    >;
                  }
                >;
              }>;
            }
          >;
          freeGiftSubscription?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'> & {
              references?: StorefrontAPI.Maybe<{
                nodes: Array<
                  Pick<StorefrontAPI.ProductVariant, 'id'> & {
                    product: Pick<StorefrontAPI.Product, 'title'> & {
                      sizeChart?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.Image, 'url'>
                          >;
                        }>;
                      }>;
                    };
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                    selectedOptions: Array<
                      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                    >;
                  }
                >;
              }>;
            }
          >;
          sellingPlanAllocations: {
            nodes: Array<{
              sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
              priceAdjustments: Array<{
                compareAtPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                perDeliveryPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
              }>;
            }>;
          };
        }
      >;
      adjacentVariants: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          unitsPerPack?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'>
          >;
          freeGift?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'> & {
              references?: StorefrontAPI.Maybe<{
                nodes: Array<
                  Pick<StorefrontAPI.ProductVariant, 'id'> & {
                    product: Pick<StorefrontAPI.Product, 'title'> & {
                      sizeChart?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.Image, 'url'>
                          >;
                        }>;
                      }>;
                    };
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                    selectedOptions: Array<
                      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                    >;
                  }
                >;
              }>;
            }
          >;
          freeGiftSubscription?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'value'> & {
              references?: StorefrontAPI.Maybe<{
                nodes: Array<
                  Pick<StorefrontAPI.ProductVariant, 'id'> & {
                    product: Pick<StorefrontAPI.Product, 'title'> & {
                      sizeChart?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.Image, 'url'>
                          >;
                        }>;
                      }>;
                    };
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                    selectedOptions: Array<
                      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                    >;
                  }
                >;
              }>;
            }
          >;
          sellingPlanAllocations: {
            nodes: Array<{
              sellingPlan: Pick<StorefrontAPI.SellingPlan, 'id'>;
              priceAdjustments: Array<{
                compareAtPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                perDeliveryPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
              }>;
            }>;
          };
        }
      >;
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
    }
  >;
};

export type SearchProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'handle' | 'id' | 'publishedAt' | 'title' | 'trackingParameters' | 'vendor'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
      }
    >;
  };

export type SearchPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type SearchArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type PageInfoFragmentFragment = Pick<
  StorefrontAPI.PageInfo,
  'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
>;

export type RegularSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  term: StorefrontAPI.Scalars['String']['input'];
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type RegularSearchQuery = {
  articles: {
    nodes: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  pages: {
    nodes: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'handle'
        | 'id'
        | 'publishedAt'
        | 'title'
        | 'trackingParameters'
        | 'vendor'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PredictiveArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    blog: Pick<StorefrontAPI.Blog, 'handle'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          blog: Pick<StorefrontAPI.Blog, 'handle'>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

interface GeneratedQueryTypes {
  '#graphql\n  #graphql\n  fragment AccountHero on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    hero_image: field(key: "hero_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n\n  query AccountPageCms {\n    accountHero: metaobject(handle: {handle: "account-page", type: "account_page"}) {\n      id\n      handle\n\n      ... on Metaobject {\n        ...AccountHero\n      }\n    }\n  }\n': {
    return: AccountPageCmsQuery;
    variables: AccountPageCmsQueryVariables;
  };
  '#graphql\nquery BlogPostsByHandle($handle: String!) {\n  blog(handle: $handle) {\n    articles(first: 25) {\n      nodes {\n        id\n        handle\n        title\n        excerpt\n        contentHtml\n        image {\n          height\n          width\n          url\n          altText\n        }\n        tags\n        caption: metafield(key: "caption", namespace: "custom") {\n          type\n          value\n        }\n      }\n    }\n  }\n}': {
    return: BlogPostsByHandleQuery;
    variables: BlogPostsByHandleQueryVariables;
  };
  '#graphql\n  query BlogArticle(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      articleByHandle(handle: $articleHandle) {\n        handle\n        title\n        contentHtml\n        publishedAt\n        author: authorV2 {\n          name\n        }\n        author_name: metafield(\n          key: "author_name"\n          namespace: "custom"\n        ) {\n          value\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n        tags\n        excerpt\n        caption: metafield(key: "caption", namespace: "custom") {\n          type\n          value\n        }\n      }\n    }\n  }\n': {
    return: BlogArticleQuery;
    variables: BlogArticleQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment CommunityHero on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    hero_image: field(key: "hero_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    description: field(key: "description") {\n      value\n    }\n    grid_title: field(key: "grid_title") {\n      value\n    }\n    grid_description: field(key: "grid_description") {\n      value\n    }\n  }\n\n  \n  query CommunityPageCms {\n    communityPage: metaobject(handle: {handle: "community-page", type: "community_page"}) {\n      id\n      handle\n      \n      # Use fragment for community hero\n      ... on Metaobject {\n        ...CommunityHero\n      }\n    }\n  }\n': {
    return: CommunityPageCmsQuery;
    variables: CommunityPageCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment Accordion on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    collapsible: field(key: "collapsible") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n    numberedContent: field(key: "numbered_content") {\n      value\n    }\n    variant: field(key: "variant") {\n      value\n    }\n    content: field(key: "content") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            title: field(key: "title") {\n              value\n            }\n            description: field(key: "description") {\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n\n  query FaqPageCms {\n    faqPage: metaobject(handle: {handle: "faq-page", type: "faq_page"}) {\n      id\n      handle\n      contents: field(key: "contents") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n                ...Accordion\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: FaqPageCmsQuery;
    variables: FaqPageCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  #graphql\n  fragment CustomMenuItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    icon: field(key: "icon") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n  \n  fragment FooterMenuGroup on Metaobject {\n    id\n    type\n    title: field(key: "title") {  \n      value\n    }\n    items: field(key: "items") {\n      references(first: 10) {\n        nodes {\n          ...CustomMenuItem\n        }\n      } \n    }\n  }\n\n\n  query FooterMenuCms {\n    footerMenu: metaobject(handle: {handle: "footer-menu", type: "footer_menu"}) {\n      id\n      handle\n      groups: field(key: "groups") {\n        references(first: 10) {\n          nodes {\n            ... on Metaobject {\n                ...FooterMenuGroup\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: FooterMenuCmsQuery;
    variables: FooterMenuCmsQueryVariables;
  };
  '#graphql\n  query GlobalBannerCms {\n    globalBanners: metaobjects(type: "global_banner", first: 10) {\n      nodes {\n        id\n        handle\n        display: field(key: "display") {\n          value\n        }\n        content: field(key: "content") {\n          value\n        }\n      }\n    }\n  }\n': {
    return: GlobalBannerCmsQuery;
    variables: GlobalBannerCmsQueryVariables;
  };
  '#graphql\n  query GlobalNewsletterPopupCms {\n    globalNewsletterPopup: metaobject(handle: {handle: "global-newsletter-popup", type: "global_newsletter_popup"}) {\n      id\n      handle\n      display: field(key: "display") {\n        value\n      }\n      image: field(key: "image") {\n        reference {\n          ... on MediaImage {\n            image {\n              height\n              width\n              url\n              altText\n            }\n          }\n        }\n      }\n      title: field(key: "title") {\n        value\n      }\n      description: field(key: "description") {\n        value\n      }\n      caption: field(key: "caption") {\n        value\n      }\n    }\n  }\n': {
    return: GlobalNewsletterPopupCmsQuery;
    variables: GlobalNewsletterPopupCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment HeroWithCta on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          type\n          label: field(key: "label") {\n            value\n          }\n          internalUrl: field(key: "internal_url") {\n            value\n          }\n          externalUrl: field(key: "external_url") {\n            value\n          }\n          iconVariant: field(key: "icon_variant") {\n            value\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment TextWithCta on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          type\n          label: field(key: "label") {\n            value\n          }\n          internalUrl: field(key: "internal_url") {\n            value\n          }\n          externalUrl: field(key: "external_url") {\n            value\n          }\n          iconVariant: field(key: "icon_variant") {\n            value\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment ImageCarousel on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    subtitle: field(key: "subtitle") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          type\n          label: field(key: "label") {\n            value\n          }\n          internalUrl: field(key: "internal_url") {\n            value\n          }\n          externalUrl: field(key: "external_url") {\n            value\n          }\n          iconVariant: field(key: "icon_variant") {\n            value\n          }\n        }\n      }\n    }\n    cards: field(key: "cards") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            title: field(key: "title") {\n              value\n            }\n            description: field(key: "description") {\n              value\n            }\n            mixBlend: field(key: "mix_blend_font") {\n              value\n            }\n            image: field(key: "image") {\n              reference {\n                ... on MediaImage {\n                  image {\n                    height\n                    width\n                    url\n                    altText\n                  }\n                }\n              }\n            }\n            internalUrl: field(key: "internal_url") {\n              value\n            }\n            variant: field(key: "variant") {\n              value\n            }\n            tags: field(key: "tags") {\n              value\n            }\n          }\n        }\n      }\n    }\n    mobileLayout: field(key: "mobile_layout") {\n      value\n    }\n  }\n\n  #graphql\n  fragment Accordion on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    collapsible: field(key: "collapsible") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n    numberedContent: field(key: "numbered_content") {\n      value\n    }\n    variant: field(key: "variant") {\n      value\n    }\n    content: field(key: "content") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            title: field(key: "title") {\n              value\n            }\n            description: field(key: "description") {\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroFeaturedProduct on Metaobject {\n    id\n    type\n    platformLogos: field(key: "featured_platforms_logo") {\n      references(first: 5) {\n        nodes {\n          ... on MediaImage {\n            image {\n              height\n              width\n              url\n              altText\n            }\n          }\n        }\n      }\n    }\n    title: field(key: "title") {\n      value\n    }\n    featuredProduct: field(key: "featured_product") {\n      reference {\n        ... on Product {\n          id\n          handle\n          title\n          description\n          productType\n          featuredImage {\n            altText\n            id\n            url\n            height\n            width\n          }\n          selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n            id\n            availableForSale\n          }\n        }\n      }\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroImageWithProduct on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    featuredProduct: field(key: "featured_product") {\n      reference {\n        ... on Product {\n          id\n          title\n          description\n          productType\n          selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n            id\n            availableForSale\n            price {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n  }\n\n  \n  query HomePageCms {\n    homePage: metaobject(handle: {handle: "home-page", type: "home_page"}) {\n      id\n      handle\n      modules: field(key: "modules") {\n        references(first: 10) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n                # Use fragments for each module type\n                ...HeroWithCta\n                ...TextWithCta\n                ...ImageCarousel\n                ...Accordion\n                ...HeroFeaturedProduct\n                ...HeroImageWithProduct\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: HomePageCmsQuery;
    variables: HomePageCmsQueryVariables;
  };
  '#graphql\n   #graphql\n  fragment HeroWithCta on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          type\n          label: field(key: "label") {\n            value\n          }\n          internalUrl: field(key: "internal_url") {\n            value\n          }\n          externalUrl: field(key: "external_url") {\n            value\n          }\n          iconVariant: field(key: "icon_variant") {\n            value\n          }\n        }\n      }\n    }\n  }\n\n    #graphql\n  fragment TextWithCta on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          type\n          label: field(key: "label") {\n            value\n          }\n          internalUrl: field(key: "internal_url") {\n            value\n          }\n          externalUrl: field(key: "external_url") {\n            value\n          }\n          iconVariant: field(key: "icon_variant") {\n            value\n          }\n        }\n      }\n    }\n  }\n\n    #graphql\n  fragment ImageCarousel on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    subtitle: field(key: "subtitle") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          type\n          label: field(key: "label") {\n            value\n          }\n          internalUrl: field(key: "internal_url") {\n            value\n          }\n          externalUrl: field(key: "external_url") {\n            value\n          }\n          iconVariant: field(key: "icon_variant") {\n            value\n          }\n        }\n      }\n    }\n    cards: field(key: "cards") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            title: field(key: "title") {\n              value\n            }\n            description: field(key: "description") {\n              value\n            }\n            mixBlend: field(key: "mix_blend_font") {\n              value\n            }\n            image: field(key: "image") {\n              reference {\n                ... on MediaImage {\n                  image {\n                    height\n                    width\n                    url\n                    altText\n                  }\n                }\n              }\n            }\n            internalUrl: field(key: "internal_url") {\n              value\n            }\n            variant: field(key: "variant") {\n              value\n            }\n            tags: field(key: "tags") {\n              value\n            }\n          }\n        }\n      }\n    }\n    mobileLayout: field(key: "mobile_layout") {\n      value\n    }\n  }\n\n    #graphql\n  fragment Accordion on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    collapsible: field(key: "collapsible") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n    numberedContent: field(key: "numbered_content") {\n      value\n    }\n    variant: field(key: "variant") {\n      value\n    }\n    content: field(key: "content") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            title: field(key: "title") {\n              value\n            }\n            description: field(key: "description") {\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n\n    #graphql\n  fragment HeroFeaturedProduct on Metaobject {\n    id\n    type\n    platformLogos: field(key: "featured_platforms_logo") {\n      references(first: 5) {\n        nodes {\n          ... on MediaImage {\n            image {\n              height\n              width\n              url\n              altText\n            }\n          }\n        }\n      }\n    }\n    title: field(key: "title") {\n      value\n    }\n    featuredProduct: field(key: "featured_product") {\n      reference {\n        ... on Product {\n          id\n          handle\n          title\n          description\n          productType\n          featuredImage {\n            altText\n            id\n            url\n            height\n            width\n          }\n          selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n            id\n            availableForSale\n          }\n        }\n      }\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n    #graphql\n  fragment HeroImageWithProduct on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    featuredProduct: field(key: "featured_product") {\n      reference {\n        ... on Product {\n          id\n          title\n          description\n          productType\n          selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n            id\n            availableForSale\n            price {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n  }\n\n    #graphql\nfragment HeroImageMultiText on Metaobject {\n  id\n  type\n\n  background_image: field(key: "background_image") {\n    reference {\n      ... on MediaImage {\n        image {\n          url\n          altText\n        }\n      }\n    }\n  }\n\n  enable_overlay: field(key: "enable_overlay") {\n    value\n  }\n  overlay_opacity: field(key: "overlay_opacity") {\n    value\n  }\n\n  logo: field(key: "logo") {\n    references(first: 10) {\n      nodes {\n        ... on Metaobject {\n          image: field(key: "image") {\n            reference {\n              ... on MediaImage {\n                image {\n                  url\n                  altText\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n\n  texts: field(key: "texts") {\n    references(first: 10) {\n      nodes {\n        ... on Metaobject {\n          text: field(key: "text") { value }\n          position: field(key: "position") { value }\n          font_size: field(key: "font_size") { value }\n          font_weight: field(key: "font_weight") { value }\n          text_color: field(key: "text_color") { value }\n          tag: field(key: "tag") { value }\n          label: field(key: "label") { value }\n          listing: field(key: "listing") { value }\n        }\n      }\n    }\n  }\n}\n\n    #graphql\nfragment TextBlock on Metaobject {\n  id\n  type\n  label: field(key: "label") {\n    value\n  }\n  description: field(key: "description") {\n    value\n  }\n  header: field(key: "header") {\n    value\n  }\n  listing: field(key: "listing") {\n    value\n  }\n  footer: field(key: "footer") {\n    value\n  }\n}\n\n    #graphql\n  fragment GalleryImageCard on Metaobject {\n    id\n    type\n    shape: field(key: "shape") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n    #graphql\nfragment BannerSteps on Metaobject {\n  id\n  type\n  title: field(key: "title") {\n    value\n  }\n  title_position: field(key: "title_position") {\n    value\n  }\n  footer: field(key: "footer") {\n    value\n  }\n  footer_position: field(key: "footer_position") {\n    value\n  }\n  position: field(key: "position") {\n    value\n  }\n  text_color: field(key: "text_color") {\n    value\n  }\n  tag: field(key: "tag") {\n    value\n  }\n  background_image: field(key: "background_image") {\n    reference {\n      ... on MediaImage {\n        image {\n          url\n          altText\n        }\n      }\n    }\n  }\n  steps: field(key: "steps") {\n    references(first: 10) {\n      nodes {\n        ... on Metaobject {\n          step: field(key: "step") { value }\n          step_text_color: field(key: "step_text_color") { value }\n          step_body_color: field(key: "step_body_color") { value }\n          description: field(key: "description") { value }\n          description_text_color: field(key: "description_text_color") { value }\n          description_body_color: field(key: "description_body_color") { value }\n        }\n      }\n    }\n  }\n\n}\n\n    #graphql\nfragment GalleryRows on Metaobject {\n  id\n  type\n\n  image: field(key: "image") {\n    reference {\n      ... on MediaImage {\n        image {\n          url\n          altText\n        }\n      }\n    }\n  }\n\n  title: field(key: "title") {\n    value\n  }\n  label: field(key: "label") {\n    value\n  }\n}\n\n\n  query LabPageCms {\n    paceLabPage: metaobject(\n      handle: {type: "pace_lab_page", handle: "lab"}\n    ) {\n      id\n      handle\n\n      header_feature: field(key: "header_feature") { value }\n\n      hero_with_text: field(key: "hero_with_text") {\n          reference {\n              ... on Metaobject {\n                  id\n                  type\n                  ...HeroImageMultiText\n              }\n          }\n      }\n\n      text: field(key: "text") {\n         reference {\n          ... on Metaobject {\n            ...TextBlock\n          }\n        }\n      }\n\n      banner: field(key: "banner") {\n        reference {\n              ... on Metaobject {\n                  id\n                  type\n                  ...HeroImageMultiText\n              }\n          }\n      } \n\n\n      description: field(key: "description") {\n         reference {\n          ... on Metaobject {\n            ...TextBlock\n          }\n        }\n      }\n\n      question_title: field(key: "question_title") {\n          reference {\n              \n              ... on Metaobject {\n                  id\n                  type\n                  ...Accordion\n              \n              }\n          }\n      }\n\n      gallery: field(key: "gallery") {\n         reference {\n          ... on Metaobject {\n            ...GalleryImageCard\n          }\n        }\n      }\n\n      sign_up: field(key: "sign_up") {\n         reference {\n          ... on Metaobject {\n            ...TextWithCta\n          }\n        }\n      }\n\n      steps: field(key: "steps") {\n         reference {\n          ... on Metaobject {\n            ...BannerSteps\n          }\n        }\n      }\n\n      schedule: field(key: "schedule") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n              ...GalleryRows\n            }\n          }\n        }\n      }\n\n      proof: field(key: "proof") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n              ...GalleryImageCard\n            }\n          }\n        }\n      }\n\n\n      modules: field(key: "modules") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n              ...HeroWithCta\n                ...TextWithCta\n                ...ImageCarousel\n                ...Accordion\n                ...HeroFeaturedProduct\n                ...HeroImageWithProduct\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: LabPageCmsQuery;
    variables: LabPageCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment Accordion on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    collapsible: field(key: "collapsible") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n    numberedContent: field(key: "numbered_content") {\n      value\n    }\n    variant: field(key: "variant") {\n      value\n    }\n    content: field(key: "content") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            title: field(key: "title") {\n              value\n            }\n            description: field(key: "description") {\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment FounderCard on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    image: field(key: "image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    # TODO: Article is only available from version 2025-10\n    # dialogContent: field(key: "dialog_content") {\n    #   reference {\n    #     ... on Article {\n    #       id\n    #       title\n    #       handle\n    #       contentHtml\n    #     }\n    #   }\n    # }\n  }\n\n  #graphql\n  fragment GalleryImageCard on Metaobject {\n    id\n    type\n    shape: field(key: "shape") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n  \n  query OurStoryPageCms {\n    ourStoryPage: metaobject(handle: {handle: "our-story-page", type: "our_story_page"}) {\n      id\n      handle\n      title: field(key: "title") {\n        value\n      }\n      desktopImage: field(key: "desktop_hero_image") {\n        reference {\n          ... on MediaImage {\n            image {\n              height\n              width\n              url\n              altText\n            }\n          }\n        }\n      }\n      mobileImage: field(key: "mobile_hero_image") {\n        reference {\n          ... on MediaImage {\n            image {\n              height\n              width\n              url\n              altText\n            }\n          }\n        }\n      }\n      founderQuote: field(key: "founder_quote") {\n        value\n      }\n      quoteCaption: field(key: "quote_caption") {\n        value\n      }\n      founderCard: field(key: "founder"){\n        reference {\n          ... on Metaobject {\n            ...FounderCard\n          } \n        }\n      }\n      gallery: field(key: "gallery") {\n        references(first: 2) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n              ...GalleryImageCard\n            }\n          }\n        }\n      }\n      modules: field(key: "modules") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n                # Use fragments for each module type\n                ...Accordion\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: OurStoryPageCmsQuery;
    variables: OurStoryPageCmsQueryVariables;
  };
  '#graphql\n  query FounderBlogArticle {\n    blog(handle: "founder") {\n      handle\n      articleByHandle(handle: "meet-the-founder") {\n        title\n        contentHtml\n      }\n    }\n  }\n': {
    return: FounderBlogArticleQuery;
    variables: FounderBlogArticleQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment ScienceHero on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    subtitle: field(key: "subtitle") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    hero_image: field(key: "hero_image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n  \n  query SciencePageCms {\n    sciencePage: metaobject(handle: {handle: "science-page", type: "science_page"}) {\n      id\n      handle\n      \n      # Use fragment for science hero\n      ... on Metaobject {\n        ...ScienceHero\n      }\n    }\n  }\n': {
    return: SciencePageCmsQuery;
    variables: SciencePageCmsQueryVariables;
  };
  '#graphql\n  #graphql\nfragment StoreLocatorHero on Metaobject {\n  id\n  type\n  hero_header: field(key: "hero_header") {\n    value\n  }\n  hero_text_position: field(key: "hero_text_position") {\n    value\n  }\n  hero_text_color: field(key: "hero_text_color") {\n    value\n  }\n  hero_image: field(key: "hero_image") {\n    reference {\n      ... on MediaImage {\n        image {\n          height\n          width\n          url\n          altText\n        }\n      }\n    }\n  }\n}\n\n  #graphql\n#graphql\n#graphql\nfragment StoreOutlet on Metaobject {\n  id\n  type\n  area: field(key: "area") {\n    value\n  }\n  name: field(key: "name") {\n    value\n  }\n  map_url: field(key: "map_url") {\n    value\n  }\n  address: field(key: "address") {\n    value\n  }\n}\n\n\nfragment StoreLocation on Metaobject {\n  id\n  type\n  store_name: field(key: "store_name") {\n    value\n  }\n  store_logo: field(key: "store_logo") {\n    reference {\n      ... on MediaImage {\n        image {\n          url\n          altText\n        }\n      }\n    }\n  }\n  more_than_1_location: field(key: "more_than_1_location") {\n    value\n  }\n  address: field(key: "address") {\n    value\n  }\n  map_url: field(key: "map_url") {\n    value\n  }\n  outlets: field(key: "outlets") {\n    references(first: 50) {\n      nodes {\n        ... on Metaobject {\n          ...StoreOutlet\n        }\n      }\n    }\n  }\n}\n\n\nfragment StoreType on Metaobject {\n  id\n  type\n  type_name: field(key: "type_name") {\n    value\n  }\n  store_list: field(key: "store_list") {\n    references(first: 50) {\n      nodes {\n        ... on Metaobject {\n          ...StoreLocation\n        }\n      }\n    }\n  }\n}\n\n\n  query StoreLocatorPageCms {\n    storeLocatorPage: metaobject(\n      handle: {type: "store_locator", handle: "store-locator"}\n    ) {\n      id\n      handle\n      ...StoreLocatorHero\n\n      category: field(key: "category") {\n        references(first: 50) {\n          nodes {\n            ... on Metaobject {\n              ...StoreType\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: StoreLocatorPageCmsQuery;
    variables: StoreLocatorPageCmsQueryVariables;
  };
  '#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  '#graphql\n  query Footer(\n    $country: CountryCode\n    $footerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment MoneyProductItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductItem\n      }\n      maxVariantPrice {\n        ...MoneyProductItem\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyProductItem\n      }\n      maxVariantPrice {\n        ...MoneyProductItem\n      }\n    }\n    selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n      id\n      title\n      availableForSale\n      price {\n        amount\n        currencyCode\n      }\n      freeGift: metafield(key: "free_gift", namespace: "custom") {\n        value\n      }\n    }\n    productType\n    totalInventory\n  }\n\n  query Collection(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ProductItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n      }\n    }\n  }\n': {
    return: CollectionQuery;
    variables: CollectionQueryVariables;
  };
  '#graphql\n  fragment Collection on Collection {\n    id\n    title\n    handle\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n  }\n  query StoreCollections(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...Collection\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n': {
    return: StoreCollectionsQuery;
    variables: StoreCollectionsQueryVariables;
  };
  '#graphql\n  query Catalog(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...CollectionItem\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment MoneyCollectionItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment CollectionItem on Product {\n    id\n    handle\n    title\n    tags\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n    selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n      id\n      title\n      availableForSale\n      price {\n        amount\n        currencyCode\n      }\n      freeGift: metafield(key: "free_gift", namespace: "custom") {\n        value\n      }\n    }\n    productType\n  }\n\n': {
    return: CatalogQuery;
    variables: CatalogQueryVariables;
  };
  '#graphql\n  query StoreCollectionHandles(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: StoreCollectionHandlesQuery;
    variables: StoreCollectionHandlesQueryVariables;
  };
  '#graphql\n  query Page(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      handle\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageQuery;
    variables: PageQueryVariables;
  };
  '#graphql\n  fragment Policy on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n  query Policy(\n    $country: CountryCode\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $refundPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...Policy\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...Policy\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...Policy\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...Policy\n      }\n    }\n  }\n': {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  '#graphql\n  query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...Product\n      variants(first: 100) {\n        nodes {\n          id\n          title\n          selectedOptions {\n            name\n            value\n          }\n          metafield(key: "variant_type", namespace: "custom") {\n            type\n            value\n          }\n          sellingPlanAllocations(first: 1) {\n            nodes {\n              sellingPlan {\n                id\n              }\n            }\n          }\n        }\n      }\n\n      howToConsume: metafield(key: "how_to_consume", namespace: "custom") {\n        type\n        value\n      }\n      ingredients: metafield(key: "ingredients", namespace: "custom") {\n        type\n        value\n      }\n      certifiedLogos: metafield(key: "certified_logos", namespace: "custom") {\n        references(first: 5) {\n          nodes {\n            ... on MediaImage {\n              image {\n                height\n                width\n                url\n                altText\n              }\n            }\n          }\n        }\n      }\n      accordion: metafield(key: "accordion_content", namespace: "custom") {\n        type\n        reference {\n          ...Accordion\n        }\n      }\n      productEndorsements: metafield(key: "product_endorsements", namespace: "custom") {\n        type\n        references(first: 10) {\n          nodes {\n            ...ProductEndorsementCard\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment Product on Product {\n    id\n    handle\n    title\n    productType\n    tags\n    vendor\n    descriptionHtml\n    description\n    encodedVariantExistence\n    encodedVariantAvailability\n    options {\n      name\n      optionValues {\n        name\n        firstSelectableVariant {\n          ...ProductVariant\n        }\n        swatch {\n          color\n          image {\n            previewImage {\n              url\n            }\n          }\n        }\n      }\n    }\n    images(first: 10) {\n      nodes {\n        height\n        width\n        url\n        altText\n      }\n    }\n    sellingPlanGroups(first:10) {\n      nodes {\n        ...SellingPlanGroup\n      }\n    }\n    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n      ...ProductVariant\n    }\n    adjacentVariants (selectedOptions: $selectedOptions) {\n      ...ProductVariant\n    }\n    seo {\n      description\n      title\n    }\n  }\n  #graphql\n  fragment SellingPlanGroup on SellingPlanGroup {\n    name\n    options {\n      name\n      values\n    }\n    sellingPlans(first:10) {\n      nodes {\n        ...SellingPlan\n      }\n    }\n  }\n  #graphql\n  fragment SellingPlanMoney on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment SellingPlan on SellingPlan {\n    id\n    options {\n      name\n      value\n    }\n    priceAdjustments {\n      adjustmentValue {\n        ... on SellingPlanFixedAmountPriceAdjustment {\n          __typename\n          adjustmentAmount {\n            ... on MoneyV2 {\n               ...SellingPlanMoney\n            }\n          }\n        }\n        ... on SellingPlanFixedPriceAdjustment {\n          __typename\n          price {\n            ... on MoneyV2 {\n              ...SellingPlanMoney\n            }\n          }\n        }\n        ... on SellingPlanPercentagePriceAdjustment {\n          __typename\n          adjustmentPercentage\n        }\n      }\n      orderCount\n    }\n    recurringDeliveries\n    checkoutCharge {\n      type\n      value {\n        ... on MoneyV2 {\n          ...SellingPlanMoney\n        }\n        ... on SellingPlanCheckoutChargePercentageValue {\n          percentage\n        }\n      }\n    }\n }\n\n\n  #graphql\n  fragment ProductVariant on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n    unitsPerPack: metafield(key: "units_per_pack", namespace: "custom") {\n      value\n    }\n    freeGift: metafield(key: "free_gift", namespace: "custom") {\n      value\n      references(first: 10) {\n        nodes {\n          ... on ProductVariant {\n            id\n            product {\n              title\n              sizeChart: metafield(key: "size_chart", namespace: "custom") {\n                reference {\n                  ... on MediaImage {\n                    image { url }\n                  }\n                }\n              }\n            }\n            image { url altText width height }\n            selectedOptions { name value }\n          }\n        }\n      }\n    }\n    freeGiftSubscription: metafield(key: "free_gift_subscription", namespace: "custom") {\n      value\n      references(first: 10) {\n        nodes {\n          ... on ProductVariant {\n            id\n            product {\n              title\n              sizeChart: metafield(key: "size_chart", namespace: "custom") {\n                reference {\n                  ... on MediaImage {\n                    image { url }\n                  }\n                }\n              }\n            }\n            image { url altText width height }\n            selectedOptions { name value }\n          }\n        }\n      }\n    }\n    sellingPlanAllocations(first: 10) {\n      nodes {\n        sellingPlan {\n          id\n        }\n        priceAdjustments {\n          compareAtPrice {\n            amount\n            currencyCode\n          }\n          price {\n            amount\n            currencyCode\n          }\n          perDeliveryPrice {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n\n\n  #graphql\n  fragment Accordion on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    collapsible: field(key: "collapsible") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n    numberedContent: field(key: "numbered_content") {\n      value\n    }\n    variant: field(key: "variant") {\n      value\n    }\n    content: field(key: "content") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            title: field(key: "title") {\n              value\n            }\n            description: field(key: "description") {\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment ProductEndorsementCard on Metaobject {\n    id\n    type\n    description: field(key: "description") {\n      value\n    }\n    name: field(key: "name") {\n      value\n    }\n    position: field(key: "position") {\n      value\n    }\n    image: field(key: "image") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query RegularSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $term: String!\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    articles: search(\n      query: $term,\n      types: [ARTICLE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Article {\n          ...SearchArticle\n        }\n      }\n    }\n    pages: search(\n      query: $term,\n      types: [PAGE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Page {\n          ...SearchPage\n        }\n      }\n    }\n    products: search(\n      after: $endCursor,\n      before: $startCursor,\n      first: $first,\n      last: $last,\n      query: $term,\n      sortKey: RELEVANCE,\n      types: [PRODUCT],\n      unavailableProducts: HIDE,\n    ) {\n      nodes {\n        ...on Product {\n          ...SearchProduct\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  #graphql\n  fragment SearchProduct on Product {\n    __typename\n    handle\n    id\n    publishedAt\n    title\n    trackingParameters\n    vendor\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n      compareAtPrice {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n  #graphql\n  fragment SearchPage on Page {\n     __typename\n     handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment SearchArticle on Article {\n    __typename\n    handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment PageInfoFragment on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n\n': {
    return: RegularSearchQuery;
    variables: RegularSearchQueryVariables;
  };
  '#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...PredictiveProduct\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    blog {\n      handle\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
  '#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
