//#region > Imports
import { TOKEN_AUTH_S, TOKEN_AUTH_F } from "../actions/authActions";
//#endregion

//#region > Config
// Have initial state for when state is not ready to be passed
const initState = {
  value: 0,
};
//#endregion

//#region > Functions
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case TOKEN_AUTH_S:
      return { ...state, cmsData: action.payload, error: false };
    case TOKEN_AUTH_F:
      return { ...state, cmsData: null, error: action.payload?.error };
    default:
      return { ...state };
  }
};
//#endregion

//#region > Exports
export default authReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
