//#region > Imports
import { TOKEN_AUTH_S, TOKEN_AUTH_F } from "../actions/authActions";
//#endregion

//#region > Config
// Have initial state for when state is not ready to be passed
const initState = {
  error: undefined,
  logged: null,
};
//#endregion

//#region > Functions
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case TOKEN_AUTH_S:
      return { ...state, logged: action?.payload?.token, error: undefined };
    case TOKEN_AUTH_F:
      return { ...state, logged: false, error: action.payload?.error };
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
