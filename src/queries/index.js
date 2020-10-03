//> Backend Connection
// Apollo
import { gql } from "apollo-boost";

export const LOGIN_USER = gql`
  mutation tokenAuth {
    tokenAuth(username: "cisco", password: "ciscocisco") {
      token
      refreshToken
      images {
        id
        urlLink
      }
      survey {
        id
        contentType
        ... on SurveySurveyFormPage {
          id
          slug
          surveyHead
          surveySubhead
          thankYouText
          formFields {
            name
            helpText
            required
            title
            placeholder
            image {
              url
            }
            choices
            fieldType
          }
        }
      }
      rudel {
        id
        title
        ... on KaffeerudelKaffeerudelPage {
          slug
          city
          zipCode
          address
          telephone
          telefax
          vatNumber
          whatsappTelephone
          whatsappContactline
          shipping
          gtc
          cancellationPolicy
          taxId
          courtOfRegistry
          placeOfRegistry
          tradeRegisterNumber
          ownership
          email
          copyrightholder
          about
          privacy
          sections {
            ... on Kaffeerudel_S_FAQBlock {
              __typename
              questions
            }
            ... on Kaffeerudel_S_BlueBlock {
              __typename
              blueHead
              blueLead
              blueButton {
                buttonLink
                buttonTitle
              }
            }
            ... on Kaffeerudel_S_ShopBlock {
              __typename
            }
            ... on Kaffeerudel_S_HeadBlock {
              __typename
              head
              lead
            }
            ... on Kaffeerudel_S_ImagesBlock {
              __typename
              images
            }
            ... on Kaffeerudel_S_RatingsBlock {
              __typename
              ratingsCount
            }
            ... on Kaffeerudel_S_FeatureBlock {
              __typename
              features
            }
            ... on Kaffeerudel_S_InstagramBlock {
              __typename
              instagramId
              instagramPc
            }
            ... on Kaffeerudel_S_ContentLeftBlock {
              __typename
              clHead
              clLead
              clText
              clCenter
              clImage {
                id
              }
              clButton {
                buttonLink
                buttonTitle
              }
            }
            ... on Kaffeerudel_S_ContentRightBlock {
              __typename
              crHead
              crLead
              crText
              crCenter
              crImage {
                id
              }
              crButton {
                buttonLink
                buttonTitle
              }
            }
          }
          footers {
            ... on Kaffeerudel_S_SmallTrustedBlock {
              trustedPartner
            }
            ... on Kaffeerudel_S_SmallTrustedPBlock {
              trustedPaymentmethods
            }
          }
        }
      }
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
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
