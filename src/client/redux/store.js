//#region > Imports
//> Redux
import { createStore } from "redux";

//> Reducers
import rootReducer from "./reducers/rootReducer";
//#endregion

//#region > Config
const store = createStore(rootReducer);
//#endregion

//#region > Exports
export default store;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
