//#region > Imports
//> Queries
// Wagtail
import { GET_PAGE, GET_IMAGES } from "../../queries";
//#endregion

//#region > Action types
// Get page
export const GET_PAGE_S = "GET_PAGE_SUCCESS";
export const GET_PAGE_F = "GET_PAGE_FAIL";
// Get all images
export const GET_IMAGES_S = "GET_IMAGES_SUCCESS";
export const GET_IMAGES_F = "GET_IMAGES_FAIL";
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
                (page) => page.__typename !== "HomeHomePage"
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
          console.log(data);

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
