//#region > Imports
import { GET_PAGE_S, GET_PAGE_F } from "../actions/pageActions";
//#endregion

//#region > Config
// Have initial state for when state is not ready to be passed
const initState = {
  root: null,
  error: undefined,
};
//#endregion

//#region > Functions
const pageReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_PAGE_S:
      return {
        ...state,
        root: action.payload?.root,
        sub: action.payload?.sub,
        error: false,
      };
    case GET_PAGE_F:
      return { ...state, root: null, error: action.payload?.error };
    default:
      return { ...state };
  }
};
//#endregion

//#region > Exports
export default pageReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
