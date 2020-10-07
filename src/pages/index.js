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
import { getPage, getImages } from "../redux/actions/pageActions";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../components/molecules";
import {
  HeadSection,
  ContentBlock,
  FeaturesSection,
  HeroSection,
} from "../components/organisms/sections";
//#endregion

//#region > Page
class Home extends React.Component {
  state = { page: undefined, images: undefined };

  componentDidMount = () => {
    // Get tokens and page data
    this.props.tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(this.props.refreshToken, 120000);

    if (this.props.logged) {
      // Get root page
      this.props.getPage();
      // Get all images
      this.props.getImages();
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
        page: this.props.page[0],
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
    const { page, images } = this.state;

    console.log("PAGE", page);

    return (
      <div className="flyout">
        <Navbar />
        <main>
          {page?.headers && <HeroSection data={page.headers} />}
          {page?.sections &&
            page.sections.map((section, s) => {
              console.log(section);
              return (
                <React.Fragment key={s}>
                  {(() => {
                    switch (section.__typename) {
                      case "Home_S_ContentCenter":
                        return <HeadSection data={section} />;
                      case "Home_S_FeatureBlock":
                        return (
                          <FeaturesSection data={section} images={images} />
                        );
                      case "Home_S_ContentLeft":
                        return (
                          <ContentBlock data={section} orientation="left" />
                        );
                      case "Home_S_ContentRight":
                        return (
                          <ContentBlock data={section} orientation="right" />
                        );
                      case "Home_S_ImagesBlock":
                        return <ImageSection data={section} />;
                      default:
                        console.warn(
                          "Unimplemented section " + section.__typename
                        );
                    }
                  })()}
                </React.Fragment>
              );
            })}
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
  getImages,
};
//#endregion

//#region > Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
