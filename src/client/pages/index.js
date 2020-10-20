//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
//> SEO
import { NextSeo } from "next-seo";
//> Redux
// Basic Redux provider
import { connect } from "react-redux";
//> Tinycolor
// Color management
import tinycolor from "tinycolor2";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBContainer,
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
class Home extends React.Component {
  state = { page: undefined, images: undefined };

  componentDidMount = () => {
    // Get tokens and page data
    this.props.tokenAuth();
    // Refresh token every 2 minutes (120000 ms)
    this.refreshInterval = window.setInterval(this.props.refreshToken, 120000);

    if (this.props.logged && !this.props.error) {
      // Get root page
      this.props.getPage();
      // Get all images
      this.props.getImages();
    }
  };

  componentDidUpdate = () => {
    const { page, images } = this.state;

    if (this.props.logged && !page && !this.props.error) {
      // Get root page
      this.props.getPage();
    }

    if (this.props.logged && !images && !this.props.error) {
      // Get all images
      this.props.getImages();
    }

    // Set page state
    if (!page && this.props.page && this.props.logged && !this.props.error) {
      this.setState({
        page: this.props.page[0],
      });
    }

    // Set all images as state
    if (
      !images &&
      this.props.images &&
      this.props.logged &&
      !this.props.error
    ) {
      this.setState({
        images: this.props.images,
      });
    }

    const hash = window.location.hash;

    if (hash) {
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  sendMsg = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { fullname, email, phone, note } = this.state;
    const { router } = this.props;

    const slug = router.query?.slug;
    const link = window.location?.origin;

    const success = await this.props.sendMessage(
      "Landingpage",
      "https://www.top-immo.org",
      fullname,
      "Miete",
      email,
      phone,
      note
    );

    if (success) {
      this.setState({
        msgSent: true,
      });
    } else {
      this.setState({
        msgSent: false,
      });
    }
  };

  render() {
    const { page, images } = this.state;

    return (
      <div className="flyout">
        <NextSeo
          title="TOP Immo - Immobilien aus erster Hand"
          description="Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt."
          canonical="https://www.top-immo.org/"
          openGraph={{
            url: "https://www.top-immo.org",
            title: "TOP Immo - Immobilien aus erster Hand",
            description:
              "Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt.",
            site_name: "TopImmo",
          }}
        />
        <Navbar />
        <main>
          {page?.headers && <HeroSection data={page.headers} />}
          {page?.sections &&
            page.sections.map((section, s) => {
              return (
                <React.Fragment key={s}>
                  {(() => {
                    switch (section.__typename) {
                      case "Home_S_ContentCenter":
                        return (
                          <HeadSection
                            data={section}
                            dark={
                              section.color
                                ? tinycolor(section.color).getBrightness() < 100
                                : false
                            }
                          />
                        );
                      case "Home_S_ContentLeft":
                        return (
                          <ContentBlock data={section} orientation="left" />
                        );
                      case "Home_S_ContentRight":
                        return (
                          <ContentBlock data={section} orientation="right" />
                        );
                      case "Home_S_FeatureBlock":
                        return (
                          <FeaturesSection data={section} images={images} />
                        );
                      case "Home_S_PartnersBlock":
                        return (
                          <PartnerSection data={section} images={images} />
                        );
                      case "Home_S_AboutBlock":
                        return (
                          <ContentBlock
                            data={{
                              __typename: "Home_S_ContentRight",
                              contentRightHead: section.aboutHead,
                              contentRightLead: section.aboutLead,
                              contentRightText: section.aboutText,
                              contentRightImg: section.aboutImg,
                            }}
                            orientation="right"
                            id="about"
                          />
                        );
                      default:
                        console.warn(
                          "Unimplemented section " + section.__typename
                        );
                    }
                  })()}
                </React.Fragment>
              );
            })}
          <MDBContainer>
            <section className="my-5">
              <h2 className="h1-responsive font-weight-bold text-center mt-5">
                Kontaktiere uns
              </h2>
              <p className="text-center w-responsive mx-auto pb-3">
                Sie haben Fragen zu unserem Unternehmen oder Immobilien?
              </p>
              <MDBRow className="flex-center">
                <MDBCol lg="5" className="lg-0 mb-4">
                  <MDBCard>
                    <MDBCardBody>
                      {this.state.msgSent === undefined ? (
                        <form onSubmit={(e) => this.sendMsg(e)}>
                          <div className="md-form">
                            <MDBInput
                              icon="user"
                              label="Name"
                              iconClass="grey-text"
                              type="text"
                              id="form-name"
                              name="fullname"
                              onChange={(e) =>
                                this.setState({
                                  [e.target.name]: e.target.value,
                                })
                              }
                              value={this.state.fullname}
                              outline
                              required
                            />
                          </div>
                          <div className="md-form">
                            <MDBInput
                              icon="envelope"
                              label="E-Mail"
                              iconClass="grey-text"
                              type="email"
                              id="form-name"
                              name="email"
                              onChange={(e) =>
                                this.setState({
                                  [e.target.name]: e.target.value,
                                })
                              }
                              value={this.state.email}
                              outline
                              required
                            />
                          </div>
                          <div className="md-form">
                            <MDBInput
                              icon="phone"
                              label="Telefonnummer (optional)"
                              iconClass="grey-text"
                              type="text"
                              id="form-name"
                              name="phone"
                              onChange={(e) =>
                                this.setState({
                                  [e.target.name]: e.target.value,
                                })
                              }
                              value={this.state.phone}
                              outline
                            />
                          </div>
                          <div className="md-form">
                            <MDBInput
                              icon="pen"
                              label="Notiz (optional)"
                              iconClass="grey-text"
                              type="textarea"
                              id="form-text"
                              name="note"
                              onChange={(e) =>
                                this.setState({
                                  [e.target.name]: e.target.value,
                                })
                              }
                              value={this.state.note}
                              outline
                            />
                          </div>
                          <div className="text-center">
                            <MDBBtn color="blue" type="submit">
                              Senden
                            </MDBBtn>
                          </div>
                        </form>
                      ) : (
                        <>
                          {this.state.msgSent ? (
                            <>
                              <MDBAlert color="success" className="text-center">
                                <MDBIcon far icon="check-circle" size="2x" />
                                <p className="mb-1 lead">
                                  Vielen Dank für Ihr Interesse.
                                </p>
                                <p>Wir melden uns bei Ihnen.</p>
                              </MDBAlert>
                            </>
                          ) : (
                            <>
                              <MDBAlert color="danger" className="text-center">
                                <MDBIcon far icon="times-circle" size="2x" />
                                <p className="mb-1 lead">
                                  Wir konnten Ihre Nachricht nicht zustellen.
                                </p>
                                <p>Bitte versuchen Sie es später erneut.</p>
                              </MDBAlert>
                            </>
                          )}
                        </>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>
          <CookieModal saveCookie={this.saveCookie} />
        </main>
        <Footer data={page} />
      </div>
    );
  }
}
//#endregion

//#region > Functions
const mapStateToProps = (state) => ({
  logged: state.auth.logged,
  page: state.page.root,
  error: state.page.error,
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
