//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> NextJS
import Link from "next/link";
//> SEO
import { NextSeo } from "next-seo";
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
  MDBInput,
  MDBCard,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBAlert,
} from "mdbreact";

//> Queries
import { GET_EVERYTHING, SEND_MESSAGE } from "../../queries";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../../components/molecules";
import { HeadSection, ContentBlock } from "../../components/organisms/sections";
//#endregion

//#region > Page
class Item extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    note: "",
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
            title: this.props.data?.slug ? this.props.data?.slug : "",
            link: link ? link : "",
            name: fullname ? fullname : "",
            type: "Miete",
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
    const { page, images } = data;

    return (
      <div className="flyout">
        {page !== null && page !== false && (
          <NextSeo
            title={page.title + " - TOP Immo"}
            description="Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt."
            canonical={"https://www.top-immo.org/item/" + page.slug}
            openGraph={{
              url: "https://www.top-immo.org/item/" + page.slug,
              title: page.title + " - TOP Immo",
              description:
                "Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt.",
              site_name: "TopImmo",
            }}
          />
        )}
        <Navbar />
        <main>
          <article>
            <MDBContainer className="mt-5 pt-5">
              {page !== null && page !== false ? (
                <div className="mt-5">
                  <MDBRow>
                    <MDBCol>
                      <MDBJumbotron className="text-center">
                        <MDBBreadcrumb className="mb-0 d-sm-none d-flex">
                          <Link href="/">
                            <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                          </Link>
                          <MDBBreadcrumbItem onClick={() => router.back()}>
                            Projekt
                          </MDBBreadcrumbItem>
                          <MDBBreadcrumbItem active>
                            {page.title}
                          </MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                        <MDBCarousel
                          activeItem={1}
                          length={page.headers.length}
                          showControls={page.headers.length > 1}
                          showIndicators={page.headers.length > 1}
                          className="z-depth-1"
                        >
                          <MDBCarouselInner>
                            {page.headers.map((item, i) => {
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
                                    />
                                  </MDBView>
                                </MDBCarouselItem>
                              );
                            })}
                          </MDBCarouselInner>
                        </MDBCarousel>
                        <MDBCardBody>
                          <MDBRow className="flex-center">
                            <MDBCol lg="12">
                              <MDBCardTitle className="h3 mt-3">
                                {page.title}
                              </MDBCardTitle>
                            </MDBCol>
                            {process.browser && (
                              <MDBCol lg="12">
                                <MDBLightbox
                                  md="12"
                                  className="justify-content-center groundplan"
                                  images={[
                                    {
                                      src:
                                        process.env.NEXT_PUBLIC_BASEURL +
                                        page.groundPlan[0].groundPlan.url,
                                    },
                                  ]}
                                />
                              </MDBCol>
                            )}
                          </MDBRow>
                          <hr className="mt-5" />
                          {page.sections.map((section, s) => {
                            return (
                              <>
                                {(() => {
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
                          {process.browser && (
                            <MDBLightbox
                              md="4"
                              images={images}
                              className="mt-4"
                            />
                          )}
                          <MDBRow className="flex-center">
                            <MDBCol lg="5">
                              <MDBCard className="text-left z-depth-0 my-4">
                                <MDBCardBody>
                                  <div className="text-center">
                                    <p className="lead text-muted">
                                      Interessiert?
                                    </p>
                                    <h2>Kontaktanfrage</h2>
                                  </div>
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
                                              Bitte versuchen Sie es später
                                              erneut.
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
                        </MDBCardBody>
                      </MDBJumbotron>
                    </MDBCol>
                  </MDBRow>
                </div>
              ) : (
                <>
                  {page === false ? (
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
        <Footer /*data={root}*/ />
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

Item.getInitialProps = async ({ query }) => {
  const client = await getStandaloneApolloClient();

  const { data } = await client.query({
    query: GET_EVERYTHING,
  });

  const { pages } = data;
  const slug = query.slug;

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
          src: process.env.NEXT_PUBLIC_BASEURL + image.galleryImage?.url,
        },
      ];
    });
  }

  return {
    data: { page: selectedPage, images, slug },
  };
};
//#endregion

//#region > Exports
export default Item;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
