//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
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
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBCard,
} from "mdbreact";

//> Queries
import { GET_EVERYTHING } from "../../queries";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../../components/molecules";
import { HeadSection, ContentBlock } from "../../components/organisms/sections";
//#endregion

//#region > Page
class Product extends React.Component {
  render() {
    const { data } = this.props;
    const { page, images, flats } = data;

    return (
      <div className="flyout">
        {page !== null && page !== false && (
          <NextSeo
            title={page.title + " - TOP Immo"}
            description="Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt."
            canonical={"https://www.top-immo.org/project/" + page.slug}
            openGraph={{
              url: "https://www.top-immo.org/project/" + page.slug,
              title: page.title + " - TOP Immo",
              description:
                "Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt.",
              site_name: "TopImmo",
            }}
          />
        )}
        <Navbar />
        <main id="project">
          <article>
            <MDBContainer className="mt-5 pt-5">
              {page !== null && page !== false ? (
                <div className="mt-5">
                  <MDBRow>
                    <MDBCol>
                      <MDBJumbotron className="text-center">
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
                                      className="text-white text-center d-sm-block d-none pt-5"
                                    >
                                      <h1>{page.title}</h1>
                                    </MDBMask>
                                  </MDBView>
                                </MDBCarouselItem>
                              );
                            })}
                          </MDBCarouselInner>
                        </MDBCarousel>
                        <MDBCardBody>
                          <h1 className="d-sm-none d-block">{page.title}</h1>
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
                          <MDBRow className="flex-center flat-list">
                            {page.flats &&
                              page.flats.map((flat, i) => {
                                const flatDetails = flats
                                  ? flats.filter(
                                      (f) => f.slug === flat.flat.slug
                                    )[0]
                                  : null;

                                return (
                                  <>
                                    {flatDetails ? (
                                      <MDBCol
                                        lg="4"
                                        className="border rounded p-0 mb-4"
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
                                                Nicht verfügbar
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
                          {process.browser && (
                            <MDBLightbox md="4" images={images} />
                          )}
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
        <Footer /*data={root ? root[0] : null}*/ />
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

Product.getInitialProps = async ({ query }) => {
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

  const flats = pages.filter((p) => p.__typename === "ProjectsFlatPage");

  return {
    data: { page: selectedPage, images, flats },
  };
};
//#endregion

//#region > Exports
export default Product;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
