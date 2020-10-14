//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
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
  };

  render() {
    const { page, images } = this.state;

    console.log(this.state);

    return (
      <div className="flyout">
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                error amet numquam iure provident voluptate esse quasi,
                veritatis totam voluptas nostrum quisquam eum porro a pariatur
                veniam.
              </p>
              <MDBRow>
                <MDBCol lg="5" className="lg-0 mb-4">
                  <MDBCard>
                    <MDBCardBody>
                      <div className="md-form">
                        <MDBInput
                          icon="user"
                          label="Name"
                          iconClass="grey-text"
                          type="text"
                          id="form-name"
                          outline
                        />
                      </div>
                      <div className="md-form">
                        <MDBInput
                          icon="envelope"
                          label="E-Mail"
                          iconClass="grey-text"
                          type="text"
                          id="form-name"
                          outline
                        />
                      </div>
                      <div className="md-form">
                        <MDBInput
                          icon="phone"
                          label="Telefonnummer (optional)"
                          iconClass="grey-text"
                          type="text"
                          id="form-name"
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
                          outline
                        />
                      </div>
                      <div className="text-center">
                        <MDBBtn color="light-blue">Submit</MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="7">
                  <div
                    id="map-container"
                    className="rounded z-depth-1-half map-container"
                    style={{ height: "400px" }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2740.809652841172!2d13.91627631579545!3d46.610764564226194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47707fe3eac35ec3%3A0x83b007f48483c09!2sKlampfererweg%2010%2C%209524%20Villach!5e0!3m2!1sde!2sat!4v1602079024962!5m2!1sde!2sat"
                      title="This is a unique title"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                    />
                  </div>
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
