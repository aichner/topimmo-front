//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
import { withRouter } from "next/router";
//> Redux
// Basic Redux provider
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBJumbotron,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardTitle,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBSpinner,
  MDBBtn,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBLightbox,
} from "mdbreact";

//> Redux
// Actions
import { tokenAuth, refreshToken } from "../../redux/actions/authActions";
import {
  getNewsPages,
  getImages,
  getPage,
} from "../../redux/actions/pageActions";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../../components/molecules";
import { HeadSection, ContentBlock } from "../../components/organisms/sections";
//#endregion

//#region > Page
class Article extends React.Component {
  state = { pages: undefined, images: undefined };

  componentDidMount = () => {
    // Get tokens and page data
    this.props.tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(this.props.refreshToken, 120000);

    if (this.props.logged && (!this.props.pages || !this.props.images)) {
      // Get root page
      this.props.getNewsPages();
      // Get root page
      this.props.getPage();
      // Get all images
      this.props.getImages();
    } else if (this.props.pages && this.props.images && this.props.root) {
      this.setState({
        pages: this.props.pages,
        images: this.props.images,
        root: this.props.root,
      });
    }
  };

  componentDidUpdate = () => {
    const { pages, images, root } = this.state;

    if (this.props.logged && (!pages || !images)) {
      // Get root page
      this.props.getNewsPages();
      // Get root page
      this.props.getPage();
      // Get all images
      this.props.getImages();
    }

    // Set page state
    if (!pages && this.props.pages && this.props.logged) {
      this.setState({
        pages: this.props.pages,
      });
    }

    // Set page state
    if (!root && this.props.root && this.props.logged && !this.props.error) {
      this.setState({
        root: this.props.root[0],
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
    const { pages, root } = this.state;
    const { router } = this.props;

    const slug = router.query?.slug;
    const selectedPage = pages
      ? pages.length > 0
        ? pages.filter((p) => p.slug === slug)[0]
          ? pages.filter((p) => p.slug === slug)[0]
          : false
        : null
      : null;

    let images = [];

    if (selectedPage !== null && selectedPage !== false) {
      selectedPage.gallery.forEach((image) => {
        images = [
          ...images,
          {
            src: process.env.NEXT_PUBLIC_BASEURL + image.galleryImage.url,
          },
        ];
      });
    }

    console.log(selectedPage);

    return (
      <div className="flyout">
        <Navbar />
        <main>
          <article>
            <MDBContainer className="mt-5 pt-5">
              {selectedPage !== null && selectedPage !== false ? (
                <div className="mt-5">
                  <MDBRow>
                    <MDBCol>
                      <MDBJumbotron className="text-center">
                        <MDBCarousel
                          activeItem={1}
                          length={selectedPage.headers.length}
                          showControls={selectedPage.headers.length > 1}
                          showIndicators={selectedPage.headers.length > 1}
                          className="z-depth-1"
                        >
                          <MDBCarouselInner>
                            {selectedPage.headers.map((item, i) => {
                              return (
                                <MDBCarouselItem itemId={i + 1}>
                                  <MDBView>
                                    <div
                                      className="w-100 h-100 img-banner"
                                      style={{
                                        backgroundImage: `url("${
                                          process.env.NEXT_PUBLIC_BASEURL +
                                          item.slideImage.url
                                        }")`,
                                      }}
                                    ></div>
                                    <MDBMask
                                      overlay="black-slight"
                                      className="flex-center text-white text-center"
                                    />
                                  </MDBView>
                                </MDBCarouselItem>
                              );
                            })}
                          </MDBCarouselInner>
                        </MDBCarousel>
                        <MDBCardBody>
                          <MDBCardTitle className="indigo-text h3 m-4">
                            {selectedPage.title}
                          </MDBCardTitle>
                          {selectedPage.sections.map((section, s) => {
                            return (
                              <>
                                {(() => {
                                  console.log(section);
                                  switch (section.__typename) {
                                    case "News_S_ContentCenter":
                                      return <HeadSection data={section} />;
                                    case "News_S_ContentLeft":
                                      return (
                                        <ContentBlock
                                          data={section}
                                          orientation="left"
                                        />
                                      );
                                    case "News_S_ContentRight":
                                      return (
                                        <ContentBlock
                                          data={section}
                                          orientation="right"
                                        />
                                      );
                                    default:
                                      console.warn(
                                        "Unimplemented section " +
                                          section.__typename
                                      );
                                  }
                                })()}
                              </>
                            );
                          })}
                          <MDBLightbox md="4" images={images} />
                        </MDBCardBody>
                      </MDBJumbotron>
                    </MDBCol>
                  </MDBRow>
                </div>
              ) : (
                <>
                  {selectedPage === false ? (
                    <div className="text-center">
                      <p className="lead">
                        Der gewünschte Artikel ist leider nicht verfügbar.
                      </p>
                      <MDBBtn color="blue" href="/">
                        <MDBIcon icon="angle-left" />
                        Zurück
                      </MDBBtn>
                    </div>
                  ) : (
                    <div className="text-center">
                      <MDBSpinner blue />
                    </div>
                  )}
                </>
              )}
            </MDBContainer>
          </article>
          <CookieModal saveCookie={this.saveCookie} />
        </main>
        <Footer data={root} />
      </div>
    );
  }
}
//#endregion

//#region > Functions
const mapStateToProps = (state) => ({
  logged: state.auth.logged,
  pages: state.page.news,
  root: state.page.root,
  images: state.page.images,
});

const mapDispatchToProps = {
  tokenAuth,
  refreshToken,
  getPage,
  getNewsPages,
  getImages,
};
//#endregion

//#region > Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Article));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
