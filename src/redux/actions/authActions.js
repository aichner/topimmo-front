//#region > Imports
//> Queries
// Wagtail
import { LOGIN_USER, REFRESH_TOKEN } from "../../queries";
//#endregion

//#region > Action types
export const TOKEN_AUTH_S = "AUTH_SUCCESS";
export const TOKEN_AUTH_F = "AUTH_FAIL";
//#endregion

//#region > Functions
const setTokens = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};
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
              token: data.tokenAuth.token,
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

export const refreshToken = () => {
  return (dispatch, getState, { clientCMS }) => {
    clientCMS
      .mutate({
        mutation: REFRESH_TOKEN,
        variables: { token: localStorage.getItem("refreshToken") },
      })
      .then(({ data }) => {
        // Set local storage
        setTokens(data.refreshToken.token, data.refreshToken.refreshToken);

        return true;
      })
      .catch((err) => {
        return false;
      });
  };
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
