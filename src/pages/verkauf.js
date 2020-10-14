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
import { tokenAuth, refreshToken } from "../redux/actions/authActions";
import {
  getProjectsPages,
  getImages,
  getFlats,
  getPage,
} from "../redux/actions/pageActions";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../components/molecules";
import { HeadSection, ContentBlock } from "../components/organisms/sections";
//#endregion

//#region > Page
class Verkauf extends React.Component {
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
    const { root } = this.props;

    console.log(pages, flats);

    const selectedPages = pages
      ? pages.length > 0
        ? pages.filter((p) => p.buyAvailable === true)
          ? pages.filter((p) => p.buyAvailable === true)
          : false
        : null
      : null;

    console.log(selectedPages);

    return (
      <div className="flyout">
        <Navbar />
        <main id="project">
          <article>
            <MDBContainer className="mt-5 pt-5">
              {selectedPages !== null && selectedPages !== false ? (
                <div className="mt-5 object-list text-center">
                  <MDBCardTitle className="indigo-text h3 m-4">
                    Verkauf
                  </MDBCardTitle>
                  <MDBRow className="flex-center">
                    {selectedPages && flats && selectedPages.length > 0 ? (
                      <>
                        {selectedPages.map((page, i) => {
                          let dedicatedFlats = [];

                          page.flats.forEach((flat) => {
                            flats.forEach((f) => {
                              if (flat.flat.slug === f.slug) {
                                dedicatedFlats = [...dedicatedFlats, f];
                              }
                            });
                          });

                          const max = Math.max.apply(
                            Math,
                            dedicatedFlats.map(function (o) {
                              return o.price;
                            })
                          );

                          const min = Math.min.apply(
                            Math,
                            dedicatedFlats.map(function (o) {
                              return o.price;
                            })
                          );

                          const available =
                            dedicatedFlats.filter((flat) => flat.available)
                              .length > 0;

                          return (
                            <>
                              <MDBCol lg="4" className="border rounded p-0">
                                <Link href={"/project/" + page.slug}>
                                  <MDBCard className="z-depth-0 p-0 object-view">
                                    <MDBCardImage
                                      src={
                                        process.env.NEXT_PUBLIC_BASEURL +
                                        page.headers[0].slideImage.url
                                      }
                                      className="img-fluid"
                                    />
                                    {available ? (
                                      <MDBBadge color="success">
                                        Verfügbar
                                      </MDBBadge>
                                    ) : (
                                      <MDBBadge color="danger">Belegt</MDBBadge>
                                    )}

                                    <MDBCardBody>
                                      <p className="lead">{page.title}</p>
                                      <p className="font-weight-bold">
                                        {page.flats.length} Objekte
                                      </p>
                                      <MDBCardText className="mt-3">
                                        <MDBBadge color="blue">
                                          {`€ ${min}`} - {`€ ${max}`}
                                        </MDBBadge>
                                      </MDBCardText>
                                    </MDBCardBody>
                                  </MDBCard>
                                </Link>
                              </MDBCol>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="lead">
                          Es stehen derzeit leider keine Objekte zum Verkauf.
                        </p>
                        <MDBBtn color="blue" href="/">
                          <MDBIcon icon="angle-left" />
                          Zurück
                        </MDBBtn>
                      </div>
                    )}
                  </MDBRow>
                </div>
              ) : (
                <>
                  {selectedPages === false ? (
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
)(withRouter(Verkauf));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
