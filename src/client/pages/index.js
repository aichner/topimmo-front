//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Head from "next/head";
//> SEO
import { NextSeo } from "next-seo";
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
  MDBSpinner,
} from "mdbreact";
//> Animations
import Fade from "react-reveal/Fade";

//> Queries
import { PAGE_QUERY } from "../queries";
//> Components
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
  state = { name: "", email: "", phone: "", note: "" };

  componentDidUpdate = () => {
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

    if (email) {
      try {
        const client = await getStandaloneApolloClient();
        const link = window.location.href;

        const res = await client.mutate({
          mutation: SEND_MESSAGE,
          variables: {
            token: localStorage.getItem("token"),
            title: "Anfrage auf Startseite",
            link: link ? link : "",
            name: fullname ? fullname : "",
            type: "Startseite",
            email: email ? email : "",
            phone: phone ? phone : "",
            note: note ? note : "",
          },
        });

        if (res) {
          this.setState({
            msgSent: true,
          });
        } else {
          this.setState({
            msgSent: false,
          });
        }
      } catch (error) {
        console.log(error);

        this.setState({
          msgSent: false,
        });
      }
    }
  };

  render() {
    const { data } = this.props;
    const { images } = data;

    const page =
      data &&
      data.pages &&
      data.pages.filter((p) => p.__typename === "HomeHomePage")[0];

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
        {page?.headers && page.sections ? (
          <>
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
                                    ? tinycolor(section.color).getBrightness() <
                                      100
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
                              <ContentBlock
                                data={section}
                                orientation="right"
                              />
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
                  <Fade bottom>
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
                                    <MDBAlert
                                      color="success"
                                      className="text-center"
                                    >
                                      <MDBIcon
                                        far
                                        icon="check-circle"
                                        size="2x"
                                      />
                                      <p className="mb-1 lead">
                                        Vielen Dank für Ihr Interesse.
                                      </p>
                                      <p>Wir melden uns bei Ihnen.</p>
                                    </MDBAlert>
                                  </>
                                ) : (
                                  <>
                                    <MDBAlert
                                      color="danger"
                                      className="text-center"
                                    >
                                      <MDBIcon
                                        far
                                        icon="times-circle"
                                        size="2x"
                                      />
                                      <p className="mb-1 lead">
                                        Wir konnten Ihre Nachricht nicht
                                        zustellen.
                                      </p>
                                      <p>
                                        Bitte versuchen Sie es später erneut.
                                      </p>
                                    </MDBAlert>
                                  </>
                                )}
                              </>
                            )}
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </Fade>
                </section>
              </MDBContainer>
              <CookieModal saveCookie={this.saveCookie} />
            </main>
            <Footer data={page} />
          </>
        ) : (
          <div className="w-100 d-flex flex-center spinner-container">
            <MDBSpinner />
          </div>
        )}
      </div>
    );
  }
}
//#endregion

//#region > Functions
export async function getStandaloneApolloClient() {
  const { ApolloClient, InMemoryCache, HttpLink } = await import(
    "@apollo/client"
  );

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_BASEURL,
    }),
    cache: new InMemoryCache(),
  });
}

Home.getInitialProps = async () => {
  const client = await getStandaloneApolloClient();

  const { data } = await client.query({
    query: PAGE_QUERY,
  });

  return {
    data,
  };
};
//#endregion

//#region > Exports
export default Home;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
