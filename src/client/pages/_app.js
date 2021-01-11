//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
//> App
import App from "next/app";

//> Queries
import { TOKEN_AUTH, REFRESH_TOKEN } from "../queries";

//> Components
import { ScrollToTop } from "../components/atoms";

//> Images
import certificateImg from "../static/svg/bautraeger.svg";
import previewImg from "../static/og.jpg";

//> Global Styling
// Local
import "../styles/globals.scss";
// Icons
import "@fortawesome/fontawesome-free/css/all.min.css";
// Material for Bootstrap
import "../styles/external/bootstrap.min.css";
// External
import "../styles/external.scss";
//#endregion

//#region > Functions
const getStandaloneApolloClient = async () => {
  const { ApolloClient, InMemoryCache, HttpLink } = await import(
    "@apollo/client"
  );

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_BASEURL,
    }),
    cache: new InMemoryCache(),
  });
};

const tokenAuth = async () => {
  const client = await getStandaloneApolloClient();

  client
    .mutate({
      mutation: TOKEN_AUTH,
    })
    .then(({ data }) => {
      if (data !== undefined) {
        // Set local storage
        localStorage.setItem("token", data.tokenAuth.token);
        localStorage.setItem("refreshToken", data.tokenAuth.refreshToken);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const refreshToken = async () => {
  const client = await getStandaloneApolloClient();

  client
    .mutate({
      mutation: REFRESH_TOKEN,
      variables: { token: localStorage.getItem("refreshToken") },
    })
    .then(({ data }) => {
      // Set local storage
      localStorage.setItem("token", data.refreshToken.token);
      localStorage.setItem("refreshToken", data.refreshToken.refreshToken);
    })
    .catch((err) => {
      dispatch({
        type: "REFRESH_FAIL",
        payload: {
          errorCode: 661,
          message: "Refresh token failed",
          error: err,
        },
      });
    });
};
//#endregion

//#region > App
class MyApp extends App {
  componentDidMount = () => {
    // Get tokens and page data
    tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(refreshToken, 120000);
  };

  /**
   * getInitialProps
   *
   * @param Component is passed as props and is the page
   * @param ctx is a getInitialProps parameter referring to Context
   * @description Using getInitialProps in _app.jsx has a different interface.
   *              When using it on normal pages, getInitialProps only has 1 parameter ctx.
   *              However in our case, since we are overriding the default App Component,
   *              we have access to the default App Component. We need to make sure if the
   *              default App component makes use of getInitialProps then we need to send
   *              whatever that function returned to the client.
   */
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be access by the client
    return { pageProps: pageProps };
  }

  render() {
    //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
    const { Component, pageProps } = this.props;

    return (
      <ScrollToTop>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:image" content={previewImg} key="ogimage" />
          <script type="text/javascript" src="/static/execute.js"></script>
        </Head>
        <div className="certificate d-sm-block d-none">
          <img src={certificateImg} />
        </div>
        <Component {...pageProps} />
      </ScrollToTop>
    );
  }
}
//#endregion

//#region > Exports
export default MyApp;
//#endregion
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
