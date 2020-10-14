//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
import { withRouter } from "next/router";
import Link from "next/link";
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
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBCard,
} from "mdbreact";

//> Redux
// Actions
import { tokenAuth, refreshToken } from "../../redux/actions/authActions";
import {
  getProjectsPages,
  getImages,
  getFlats,
  getPage,
} from "../../redux/actions/pageActions";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../../components/molecules";
import { HeadSection, ContentBlock } from "../../components/organisms/sections";
//#endregion

//#region > Page
class Product extends React.Component {
  state = { pages: undefined, images: undefined, flats: undefined };

  componentDidMount = () => {
    // Get tokens and page data
    this.props.tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(this.props.refreshToken, 120000);

    if (
      this.props.logged &&
      (!this.props.pages || !this.props.images || !this.props.flats)
    ) {
      // Get root page
      this.props.getProjectsPages();
      // Get all images
      this.props.getImages();
      // Get all pages
      this.props.getFlats();
      // Get page
      this.props.getPage();
    } else if (this.props.pages && this.props.images) {
      this.setState({
        pages: this.props.pages,
        images: this.props.images,
      });
    }
  };

  componentDidUpdate = () => {
    const { pages, images, flats } = this.state;

    if (this.props.logged && !pages) {
      // Get root page
      this.props.getProjectsPages();
    }

    if (this.props.logged && !images) {
      // Get all images
      this.props.getImages();
    }

    if (this.props.logged && !flats) {
      // Get all flats
      this.props.getFlats();
    }

    // Set page state
    if (!pages && this.props.pages && this.props.logged) {
      this.setState({
        pages: this.props.pages,
      });
    }

    // Set all images as state
    if (!images && this.props.images && this.props.logged) {
      this.setState({
        images: this.props.images,
      });
    }

    // Set all flats as state
    if (!flats && this.props.flats && this.props.logged) {
      this.setState({
        flats: this.props.flats,
      });
    }
  };

  render() {
    const { pages, flats } = this.state;
    const { router, root } = this.props;

    console.log("FLATS", flats);

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
        <main id="project">
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
                                  <MDBView className="main-view">
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
                                    >
                                      <h1>{selectedPage.title}</h1>
                                    </MDBMask>
                                  </MDBView>
                                </MDBCarouselItem>
                              );
                            })}
                          </MDBCarouselInner>
                        </MDBCarousel>
                        <MDBCardBody>
                          {selectedPage.sections.map((section, s) => {
                            return (
                              <>
                                {(() => {
                                  console.log(section);
                                  switch (section.__typename) {
                                    case "Projects_S_ContentCenter":
                                      return <HeadSection data={section} />;
                                    case "Projects_S_ContentLeft":
                                      return (
                                        <ContentBlock
                                          data={section}
                                          orientation="left"
                                        />
                                      );
                                    case "Projects_S_ContentRight":
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
                          <MDBRow className="flex-center flat-list">
                            {selectedPage.flats &&
                              selectedPage.flats.map((flat, i) => {
                                const flatDetails = flats
                                  ? flats.filter(
                                      (f) => f.slug === flat.flat.slug
                                    )[0]
                                  : null;

                                console.log("SELE", flatDetails);

                                return (
                                  <>
                                    {flatDetails ? (
                                      <MDBCol
                                        lg="4"
                                        className="border rounded p-0"
                                      >
                                        <Link
                                          href={"/item/" + flatDetails.slug}
                                        >
                                          <MDBCard className="z-depth-0 p-0 item-view">
                                            <MDBCardImage
                                              src={
                                                process.env
                                                  .NEXT_PUBLIC_BASEURL +
                                                flatDetails.groundPlan[0]
                                                  .groundPlan.url
                                              }
                                              className="img-fluid"
                                            />
                                            <MDBBadge color="blue">{`€ ${flatDetails.price}`}</MDBBadge>
                                            {flatDetails.available ? (
                                              <MDBBadge color="success">
                                                Verfügbar
                                              </MDBBadge>
                                            ) : (
                                              <MDBBadge color="danger">
                                                Vermietet
                                              </MDBBadge>
                                            )}
                                            <MDBCardBody>
                                              <p className="lead">
                                                {flatDetails.title}
                                              </p>
                                              <MDBCardText>
                                                {flatDetails.lead}
                                              </MDBCardText>
                                            </MDBCardBody>
                                          </MDBCard>
                                        </Link>
                                      </MDBCol>
                                    ) : (
                                      <MDBSpinner />
                                    )}
                                  </>
                                );
                              })}
                          </MDBRow>
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
                        Das gewünschte Projekt ist leider nicht verfügbar.
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
        <Footer data={root ? root[0] : null} />
      </div>
    );
  }
}
//#endregion

//#region > Functions
const mapStateToProps = (state) => ({
  logged: state.auth.logged,
  pages: state.page.projects,
  flats: state.page.flats,
  root: state.page.root,
  images: state.page.images,
});

const mapDispatchToProps = {
  tokenAuth,
  refreshToken,
  getProjectsPages,
  getFlats,
  getPage,
  getImages,
};
//#endregion

//#region > Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Product));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
