//#region > Imports
//> Queries
// Wagtail
import {
  GET_PAGE,
  GET_IMAGES,
  GET_NEWS,
  GET_PROJECTS,
  GET_FLATS,
} from "../../queries";
//#endregion

//#region > Action types
// Get page
export const GET_PAGE_S = "GET_PAGE_SUCCESS";
export const GET_PAGE_F = "GET_PAGE_FAIL";
// Get all images
export const GET_IMAGES_S = "GET_IMAGES_SUCCESS";
export const GET_IMAGES_F = "GET_IMAGES_FAIL";
// Get all news pages
export const GET_NEWS_PAGE_S = "GET_NEWS_PAGE_SUCCESS";
export const GET_NEWS_PAGE_F = "GET_NEWS_PAGE_FAIL";
// Get all projects pages
export const GET_PROJECTS_PAGE_S = "GET_PROJECTS_PAGE_SUCCESS";
export const GET_PROJECTS_PAGE_F = "GET_PROJECTS_PAGE_FAIL";
// Get all flats
export const GET_FLATS_PAGE_S = "GET_FLATS_PAGE_SUCCESS";
export const GET_FLATS_PAGE_F = "GET_FLATS_PAGE_FAIL";
//#endregion

//#region > Creators
export const getPage = () => {
  return (dispatch, getState, { clientCMS }) => {
    clientCMS
      .mutate({
        mutation: GET_PAGE,
        variables: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        if (data !== undefined) {
          dispatch({
            type: GET_PAGE_S,
            payload: {
              root: data.pages.filter(
                (page) => page.__typename === "HomeHomePage"
              ),
              sub: data.pages.filter(
                (page) =>
                  page.__typename !== "HomeHomePage" &&
                  page.__typename !== "ProjectsFlatPage"
              ),
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);

        dispatch({
          type: GET_PAGE_F,
          payload: {
            errorCode: 661,
            message: "Can not get root page data.",
            error: err,
          },
        });
      });
  };
};

export const getNewsPages = () => {
  return (dispatch, getState, { clientCMS }) => {
    clientCMS
      .mutate({
        mutation: GET_NEWS,
        variables: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        if (data !== undefined) {
          dispatch({
            type: GET_NEWS_PAGE_S,
            payload: {
              news: data.pages.filter(
                (page) => page.__typename === "NewsNewsPage"
              ),
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);

        dispatch({
          type: GET_NEWS_PAGE_F,
          payload: {
            errorCode: 664,
            message: "Can not get news pages.",
            error: err,
          },
        });
      });
  };
};

export const getProjectsPages = () => {
  return (dispatch, getState, { clientCMS }) => {
    clientCMS
      .mutate({
        mutation: GET_PROJECTS,
        variables: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        if (data !== undefined) {
          dispatch({
            type: GET_PROJECTS_PAGE_S,
            payload: {
              projects: data.pages.filter(
                (page) => page.__typename === "ProjectsProjectsPage"
              ),
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);

        dispatch({
          type: GET_PROJECTS_PAGE_F,
          payload: {
            errorCode: 665,
            message: "Can not get projects pages.",
            error: err,
          },
        });
      });
  };
};

export const getFlats = () => {
  return (dispatch, getState, { clientCMS }) => {
    clientCMS
      .mutate({
        mutation: GET_FLATS,
        variables: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        if (data !== undefined) {
          dispatch({
            type: GET_FLATS_PAGE_S,
            payload: {
              flats: data.pages.filter(
                (page) => page.__typename === "ProjectsFlatPage"
              ),
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);

        dispatch({
          type: GET_FLATS_PAGE_F,
          payload: {
            errorCode: 666,
            message: "Can not get flats pages.",
            error: err,
          },
        });
      });
  };
};

export const getImages = () => {
  return (dispatch, getState, { clientCMS }) => {
    clientCMS
      .mutate({
        mutation: GET_IMAGES,
        variables: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        if (data !== undefined) {
          dispatch({
            type: GET_IMAGES_S,
            payload: {
              images: data.images,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);

        dispatch({
          type: GET_IMAGES_F,
          payload: {
            errorCode: 662,
            message: "Can not get images.",
            error: err,
          },
        });
      });
  };
};
//#endregion
