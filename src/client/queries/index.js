//> Backend Connection
// Apollo
import { gql } from "apollo-boost";

export const TOKEN_AUTH = gql`
  mutation tokenAuth {
    tokenAuth(username: "anon", password: "aew5rb734AE1a7Ad7dERadf") {
      token
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refresh($token: String!) {
    refreshToken(refreshToken: $token) {
      token
      refreshToken
    }
  }
`;

export const PAGE_QUERY = gql`
  query HomePage {
    images {
      id
      url
    }
    pages {
      ... on HomeHomePage {
        about
        privacy
        telephone
        email
        zipCode
        address
        city
        copyrightholder
        sections {
          ... on Home_S_ContentCenter {
            color
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on Home_S_ContentRight {
            color
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
          ... on Home_S_ContentLeft {
            color
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on Home_S_FeatureBlock {
            color
            features
          }
          ... on Home_S_PartnersBlock {
            color
            partners
          }
          ... on Home_S_AboutBlock {
            aboutImg {
              url
            }
            aboutHead
            aboutLead
            aboutText
          }
        }
        headers {
          ... on Home_H_HeroBlock {
            slideImage {
              url
            }
            slideHead
            slidePage {
              __typename
              ... on Page {
                __typename
                ... on ProjectsProjectsPage {
                  __typename
                  slug
                }
                ... on NewsNewsPage {
                  __typename
                  slug
                }
                ... on ProjectsFlatPage {
                  __typename
                  slug
                }
                ... on HomeHomePage {
                  __typename
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_NEWS = gql`
  query NewsPages($token: String) {
    images {
      id
      url
    }
    pages(token: $token) {
      ... on NewsNewsPage {
        __typename
        slug
        title
        headers {
          ... on News_H_HeroBlock {
            slideImage {
              url
            }
          }
        }
        sections {
          ... on News_S_ContentCenter {
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on News_S_ContentLeft {
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on News_S_ContentRight {
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
        }
        gallery {
          ... on News_G_GalleryBlock {
            galleryImage {
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query ProjectPages($token: String) {
    images {
      id
      url
    }
    pages(token: $token) {
      ... on ProjectsProjectsPage {
        __typename
        slug
        title
        priceMin
        priceMax
        buyAvailable
        rentAvailable
        coordinates
        locationName
        headers {
          ... on Projects_H_HeroBlock {
            slideImage {
              url
            }
          }
        }
        sections {
          ... on Projects_S_InfoBlock {
            thumbnailImage {
              url
            }
            infoText
          }
          ... on Projects_S_ContentCenter {
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on Projects_S_ContentLeft {
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on Projects_S_ContentRight {
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
        }
        gallery {
          ... on Projects_G_GalleryBlock {
            galleryImage {
              url
            }
          }
        }
        flats {
          __typename
          ... on Projects_F_FlatsBlock {
            __typename
            flat {
              __typename
              ... on ProjectsFlatPage {
                __typename
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $title: String!
    $link: String!
    $name: String!
    $type: String!
    $email: String
    $phone: String
    $note: String
    $token: String
  ) {
    createRequest(
      title: $title
      link: $link
      name: $name
      Type: $type
      email: $email
      phone: $phone
      note: $note
      token: $token
    ) {
      r
    }
  }
`;

export const GET_FLATS = gql`
  query FlatPages {
    images {
      id
      url
    }
    pages {
      ... on ProjectsFlatPage {
        __typename
        slug
        available
        lead
        price
        title
        headers {
          ... on Projects_H_HeroBlock {
            slideImage {
              url
            }
          }
        }
        groundPlan {
          ... on Projects_P_GroundPlanBlock {
            groundPlan {
              url
            }
          }
        }
        gallery {
          ... on Projects_G_GalleryBlock {
            galleryImage {
              url
            }
          }
        }
        sections {
          ... on Projects_S_ContentCenter {
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on Projects_S_ContentLeft {
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on Projects_S_ContentRight {
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
        }
      }
    }
  }
`;

export const GET_EVERYTHING = gql`
  query EveryPage {
    images {
      id
      url
    }
    pages {
      ... on HomeHomePage {
        about
        privacy
        telephone
        email
        zipCode
        address
        city
        copyrightholder
        sections {
          ... on Home_S_ContentCenter {
            color
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on Home_S_ContentRight {
            color
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
          ... on Home_S_ContentLeft {
            color
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on Home_S_FeatureBlock {
            color
            features
          }
          ... on Home_S_PartnersBlock {
            color
            partners
          }
          ... on Home_S_AboutBlock {
            aboutImg {
              url
            }
            aboutHead
            aboutLead
            aboutText
          }
        }
        headers {
          ... on Home_H_HeroBlock {
            slideImage {
              url
            }
            slideHead
            slidePage {
              __typename
              ... on Page {
                __typename
                ... on ProjectsProjectsPage {
                  __typename
                  slug
                }
                ... on NewsNewsPage {
                  __typename
                  slug
                }
                ... on ProjectsFlatPage {
                  __typename
                  slug
                }
                ... on HomeHomePage {
                  __typename
                  slug
                }
              }
            }
          }
        }
      }
      ... on ProjectsProjectsPage {
        __typename
        slug
        title
        priceMin
        priceMax
        buyAvailable
        rentAvailable
        coordinates
        locationName
        headers {
          ... on Projects_H_HeroBlock {
            slideImage {
              url
            }
          }
        }
        sections {
          ... on Projects_S_InfoBlock {
            thumbnailImage {
              url
            }
            infoText
          }
          ... on Projects_S_ContentCenter {
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on Projects_S_ContentLeft {
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on Projects_S_ContentRight {
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
        }
        gallery {
          ... on Projects_G_GalleryBlock {
            galleryImage {
              url
            }
          }
        }
        flats {
          __typename
          ... on Projects_F_FlatsBlock {
            __typename
            flat {
              __typename
              ... on ProjectsFlatPage {
                __typename
                slug
              }
            }
          }
        }
      }
      ... on ProjectsFlatPage {
        __typename
        slug
        available
        lead
        price
        title
        headers {
          ... on Projects_H_HeroBlock {
            slideImage {
              url
            }
          }
        }
        groundPlan {
          ... on Projects_P_GroundPlanBlock {
            groundPlan {
              url
            }
          }
        }
        gallery {
          ... on Projects_G_GalleryBlock {
            galleryImage {
              url
            }
          }
        }
        sections {
          ... on Projects_S_ContentCenter {
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on Projects_S_ContentLeft {
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on Projects_S_ContentRight {
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
        }
      }
    }
  }
`;

export const GET_IMAGES = gql`
  query img($token: String) {
    images(token: $token) {
      id
      url
    }
  }
`;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
