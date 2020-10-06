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
import { getPage } from "../redux/actions/pageActions";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../components/molecules";
import {
  HeadSection,
  ContentBlock,
  FeaturesSection,
} from "../components/organisms/sections";
//#endregion

//#region > Page
class Home extends React.Component {
  state = { page: undefined };

  componentDidMount = () => {
    // Get tokens and page data
    this.props.tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(this.props.refreshToken, 120000);
    // Get root page
    this.props.getPage();
  };

  componentDidUpdate = () => {
    const { page } = this.state;

    if (!page && this.props.page) {
      this.setState({
        page: this.props.page[0],
      });
    }
  };

  render() {
    const { page } = this.state;

    console.log(page);

    return (
      <div className="flyout">
        <Navbar />
        <main>
          {page?.sections &&
            page.sections.map((section, s) => {
              console.log(section);
              return (
                <React.Fragment key={s}>
                  {(() => {
                    switch (section.__typename) {
                      case "Home_S_ContentCenter":
                        return <HeadSection data={section} />;
                      case "Home_S_ShopBlock":
                        return (
                          <ShopSection
                            collection={process.env.REACT_APP_HANDLE}
                          />
                        );
                      case "Home_S_FeatureBlock":
                        return (
                          <FeaturesSection data={section} images={images} />
                        );
                      case "Home_S_BlueBlock":
                        return <BlueLupi data={section} />;
                      case "Home_S_ContentLeft":
                        return (
                          <ContentBlock data={section} orientation="left" />
                        );
                      case "Home_S_ContentRight":
                        return (
                          <ContentBlock data={section} orientation="right" />
                        );
                      case "Home_S_ImagesBlock":
                        return <ImageSection data={section} images={images} />;
                      case "Home_S_RatingsBlock":
                        return <RatingsBlock data={section} />;
                      case "Home_S_FAQBlock":
                        return <FAQSection data={section} />;
                      case "Home_S_InstagramBlock":
                        return <InstagramSection data={section} />;
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
  counter: state.auth.value,
  page: state.page.root,
});

const mapDispatchToProps = {
  tokenAuth,
  refreshToken,
  getPage,
};
//#endregion

//#region > Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
