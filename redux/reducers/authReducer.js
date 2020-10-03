//#region > Imports
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../actions/authActions";
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
    case INCREMENT_COUNTER:
      return { ...state, value: state.value + 1 };
    case DECREMENT_COUNTER:
      return { ...state, value: state.value - 1 };
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
