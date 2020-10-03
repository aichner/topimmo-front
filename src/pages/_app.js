//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Redux
// Basic Redux provider
import { Provider } from "react-redux";
// Store, Middleware, Compose
import { createStore, applyMiddleware, compose } from "redux";
// Thunk
import thunk from "redux-thunk";
// Enables us to create a store
import withRedux from "next-redux-wrapper";
//> Apollo
import { ApolloClient } from "apollo-client";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
//> App
import App from "next/app";

//> Redux
// Root reducer
import rootReducer from "../redux/reducers/rootReducer";

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

//#region > Config
console.log(process.env.NEXT_PUBLIC_DB_BASEURL);
//> CMS API
// Client
const clientCMS = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_DB_BASEURL + "/api/graphiql",
  }),
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: [],
        },
      },
    }),
  }),
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({
        /* Aichner Cloud CMS binding*/
        clientCMS,
      })
    )
  )
);
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
