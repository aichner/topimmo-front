//> Reducers
// Authentication
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";

//> Redux
import { combineReducers } from "redux";

//> Firestore reducer
import { firestoreReducer } from "redux-firestore";

//> Firebase reducer
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  /* Authentication */
  auth: authReducer,
  /* CMS */
  page: pageReducer,
});

export default rootReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
