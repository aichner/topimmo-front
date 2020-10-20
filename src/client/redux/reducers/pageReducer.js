//#region > Imports
import {
  GET_PAGE_S,
  GET_PAGE_F,
  GET_IMAGES_S,
  GET_IMAGES_F,
  GET_NEWS_PAGE_S,
  GET_NEWS_PAGE_F,
  GET_PROJECTS_PAGE_S,
  GET_PROJECTS_PAGE_F,
  GET_FLATS_PAGE_S,
  GET_FLATS_PAGE_F,
} from "../actions/pageActions";
//#endregion

//#region > Config
// Have initial state for when state is not ready to be passed
const initState = {
  root: null,
  sub: null,
  flats: null,
  images: null,
  error: undefined,
};
//#endregion

//#region > Functions
const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PAGE_S:
      return {
        ...state,
        root: action.payload?.root,
        sub: action.payload?.sub,
        error: undefined,
      };
    case GET_PAGE_F:
      return { ...state, root: null, error: action.payload?.error };
    case GET_IMAGES_S:
      return {
        ...state,
        images: action.payload.images,
        error: undefined,
      };
    case GET_IMAGES_F:
      return { ...state, images: null, error: action.payload?.error };
    case GET_NEWS_PAGE_S:
      return {
        ...state,
        news: action.payload.news,
        error: undefined,
      };
    case GET_NEWS_PAGE_F:
      return { ...state, news: null, error: action.payload?.error };
    case GET_PROJECTS_PAGE_S:
      return {
        ...state,
        projects: action.payload.projects,
        error: undefined,
      };
    case GET_PROJECTS_PAGE_F:
      return { ...state, projects: null, error: action.payload?.error };
    case GET_FLATS_PAGE_S:
      return {
        ...state,
        flats: action.payload.flats,
        error: undefined,
      };
    case GET_FLATS_PAGE_F:
      return { ...state, flats: [], error: action.payload?.error };
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
