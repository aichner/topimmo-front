//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Redux
// Basic Redux provider
import { Provider } from "react-redux";
// Enables us to create a store
import withRedux from "next-redux-wrapper";
//> App
import App from "next/app";

//> Global Styling
// Local
import "../styles/globals.scss";
// Icons
import "@fortawesome/fontawesome-free/css/all.min.css";
// Material for Bootstrap
import "../styles/external/bootstrap.min.css";
// External
import "../styles/external.scss";
// Store
import store from "../redux/store";
//#endregion

//#region > App
class MyApp extends App {
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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
//#endregion

//#region > Exports
export default MyApp;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
