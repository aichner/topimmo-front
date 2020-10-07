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
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBSpinner,
} from "mdbreact";

//> Redux
// Actions
import { tokenAuth, refreshToken } from "../redux/actions/authActions";
import { getPage, getImages } from "../redux/actions/pageActions";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../components/molecules";
import {
  HeadSection,
  ContentBlock,
  FeaturesSection,
  HeroSection,
  PartnerSection,
} from "../components/organisms/sections";
//#endregion

//#region > Page
class About extends React.Component {
  state = { page: undefined, images: undefined };

  componentDidMount = () => {
    // Get tokens and page data
    this.props.tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(this.props.refreshToken, 120000);

    if (this.props.logged && (!this.props.page || !this.props.images)) {
      // Get root page
      this.props.getPage();
      // Get all images
      this.props.getImages();
    } else if (this.props.page && this.props.images) {
      this.setState({
        page: this.props.page.filter((p) => p.sections.length > 0)[0],
        images: this.props.images,
      });
    }
  };

  componentDidUpdate = () => {
    const { page, images } = this.state;

    if (this.props.logged && (!page || !images)) {
      // Get root page
      this.props.getPage();
      // Get all images
      this.props.getImages();
    }

    // Set page state
    if (!page && this.props.page && this.props.logged) {
      this.setState({
        page: this.props.page.filter((p) => p.sections.length > 0)[0],
      });
    }

    // Set all images as state
    if (!images && this.props.images && this.props.logged) {
      this.setState({
        images: this.props.images,
      });
    }
  };

  render() {
    const { page } = this.state;

    return (
      <div className="flyout">
        <Navbar />
        <main>
          <MDBContainer className="mt-5 pt-5">
            {page ? (
              <p dangerouslySetInnerHTML={{ __html: page.about }}></p>
            ) : (
              <MDBSpinner blue />
            )}
          </MDBContainer>
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
  logged: state.auth.logged,
  page: state.page.root,
  images: state.page.images,
});

const mapDispatchToProps = {
  tokenAuth,
  refreshToken,
  getPage,
};
//#endregion

//#region > Exports
export default connect(mapStateToProps, mapDispatchToProps)(About);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
