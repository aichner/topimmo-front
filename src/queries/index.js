//> Backend Connection
// Apollo
import { gql } from "apollo-boost";

export const LOGIN_USER = gql`
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

export const GET_PAGE = gql`
  query HomePage($token: String) {
    pages(token: $token) {
      ... on HomeHomePage {
        about
        privacy
        sections {
          ... on Home_S_ContentCenter {
            contentCenterHead
            contentCenterLead
            contentCenterText
          }
          ... on Home_S_ContentRight {
            contentRightImg {
              url
            }
            contentRightHead
            contentRightLead
            contentRightText
          }
          ... on Home_S_ContentLeft {
            contentLeftImg {
              url
            }
            contentLeftHead
            contentLeftLead
            contentLeftText
          }
          ... on Home_S_FeatureBlock {
            features
          }
          ... on Home_S_PartnersBlock {
            partners
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
                  slug
                }
                ... on NewsNewsPage {
                  slug
                }
                ... on ProjectsFlatPage {
                  slug
                }
                ... on HomeHomePage {
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
    pages(token: $token) {
      ... on ProjectsProjectsPage {
        __typename
        slug
        headers {
          ... on Projects_H_HeroBlock {
            slideImage {
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
        gallery {
          ... on Projects_G_GalleryBlock {
            galleryImage {
              url
            }
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
