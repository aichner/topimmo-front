//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
//> Redux
// Basic Redux provider
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBCard, MDBCardBody } from "mdbreact";

//> Redux
// Actions
import { tokenAuth, refreshToken } from "../redux/actions/authActions";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../components/molecules";
//#endregion

//#region > Page
class Home extends React.Component {
  componentDidMount = () => {
    // Get tokens and page data
    this.props.tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(this.props.refreshToken, 10000);
  };

  render() {
    return (
      <div className="flyout">
        <Navbar />
        <main>
          <p>Test</p>
          <CookieModal saveCookie={this.saveCookie} />
        </main>
        <Footer />
      </div>
    );
  }
}
//#endregion

//#region > Functions
const mapStateToProps = (state) => ({
  counter: state.auth.value,
});

const mapDispatchToProps = {
  tokenAuth,
  refreshToken,
};
//#endregion

//#region > Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
