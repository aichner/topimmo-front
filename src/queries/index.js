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
        }
        headers {
          ... on Home_H_HeroBlock {
            slideImage {
              url
            }
            slideHead
            slideButton {
              id
              buttonTitle
              buttonEmbed
              buttonLink
              buttonPage {
                id
                newspage {
                  id
                }
              }
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
