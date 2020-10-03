//#region > Imports
//> Queries
// Wagtail
import { LOGIN_USER, REFRESH_TOKEN } from "../../queries";
//#endregion

//#region > Action types
export const TOKEN_AUTH_S = "AUTH_SUCCESS";
export const TOKEN_AUTH_F = "AUTH_FAIL";
//#endregion

//#region > Creators
export const tokenAuth = () => {
  return (dispatch, getState, { clientCMS }) => {
    clientCMS
      .mutate({
        mutation: LOGIN_USER,
      })
      .then(({ data }) => {
        if (data !== undefined) {
          // Set local storage
          setTokens(data.tokenAuth.token, data.tokenAuth.refreshToken);

          dispatch({
            type: TOKEN_AUTH_S,
            payload: {
              rudel: data.tokenAuth.rudel,
              survey: data.tokenAuth.survey,
              images: data.tokenAuth.images,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TOKEN_AUTH_F,
          payload: {
            errorCode: 660,
            message: "Can not perform token auth.",
            error: err,
          },
        });
      });
  };
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
