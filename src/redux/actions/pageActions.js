//#region > Imports
//> Queries
// Wagtail
import { GET_PAGE } from "../../queries";
//#endregion

//#region > Action types
export const GET_PAGE_S = "GET_PAGE_SUCCESS";
export const GET_PAGE_F = "GET_PAGE_FAIL";
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
          // Set local storage
          console.log(data);
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
//#endregion
