//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
import Link from "next/link";
//> SEO
import { NextSeo } from "next-seo";
//> Animations
import Fade from "react-reveal/Fade";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
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
  MDBBadge,
  MDBCard,
} from "mdbreact";

//> Queries
import { GET_EVERYTHING } from "../queries";
//> Components
//import { ScrollToTop } from "../components/atoms";
import { Navbar, Footer, CookieModal } from "../components/molecules";
import { HeadSection, ContentBlock } from "../components/organisms/sections";
//#endregion

//#region > Page
class Vermietung extends React.Component {
  state = { pages: undefined, images: undefined, flats: undefined };

  render() {
    const { data } = this.props;
    const { pages } = data;

    const selectedPages = pages
      ? pages.length > 0
        ? pages.filter((p) => p.rentAvailable === true)
          ? pages.filter((p) => p.rentAvailable === true)
          : false
        : null
      : null;

    const flats = pages.filter((p) => p.__typename === "ProjectsFlatPage");

    return (
      <div className="flyout">
        <NextSeo
          title="Vermietung - TOP Immo"
          description="Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt."
          canonical="https://www.top-immo.org/vermietung"
          openGraph={{
            url: "https://www.top-immo.org/vermietung",
            title: "Vermietung - TOP Immo",
            description:
              "Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt.",
            site_name: "TopImmo",
          }}
        />
        <Navbar />
        <main id="project">
          <article>
            <MDBContainer className="mt-5 pt-5">
              {selectedPages !== null && selectedPages !== false ? (
                <div className="mt-5 object-list text-center">
                  <MDBCardTitle className="indigo-text h3 m-4">
                    Vermietung
                  </MDBCardTitle>
                  <Fade bottom cascade>
                    <MDBRow className="flex-center">
                      {selectedPages &&
                        flats &&
                        selectedPages.map((page, i) => {
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
                              <MDBCol
                                lg="4"
                                className="border rounded p-0 wow slideInLeft"
                              >
                                <Link href={"/project/" + page.slug}>
                                  <MDBCard className="z-depth-0 p-0 object-view">
                                    <MDBCardImage
                                      src={
                                        page.sections.filter(
                                          (p) =>
                                            p.__typename ===
                                            "Projects_S_InfoBlock"
                                        ).length > 0
                                          ? process.env.NEXT_PUBLIC_MEDIAURL +
                                            page.sections.filter(
                                              (p) =>
                                                p.__typename ===
                                                "Projects_S_InfoBlock"
                                            )[0].thumbnailImage.url
                                          : process.env.NEXT_PUBLIC_MEDIAURL +
                                            page.headers[0].slideImage.url
                                      }
                                      className="img-fluid"
                                    />
                                    {dedicatedFlats.length > 0 ? (
                                      <>
                                        {available ? (
                                          <MDBBadge color="success">
                                            Verfügbar
                                          </MDBBadge>
                                        ) : (
                                          <MDBBadge color="danger">
                                            Belegt
                                          </MDBBadge>
                                        )}
                                      </>
                                    ) : (
                                      <MDBBadge color="danger">Belegt</MDBBadge>
                                    )}
                                    <MDBCardBody>
                                      <p className="lead">{page.title}</p>
                                      <p className="font-weight-bold">
                                        {dedicatedFlats.length > 0 ? (
                                          <>{page.flats.length} Objekte</>
                                        ) : (
                                          <>1 Objekt</>
                                        )}
                                      </p>
                                      <MDBCardText className="mt-3">
                                        <MDBBadge color="blue">
                                          {dedicatedFlats.length > 0 ? (
                                            <>
                                              {`€ ${min}`} - {`€ ${max}`}
                                            </>
                                          ) : (
                                            <>€ {page.priceMin}</>
                                          )}
                                        </MDBBadge>
                                        {page.locationName && (
                                          <p className="text-muted mt-3 mb-0">
                                            <MDBIcon
                                              icon="map-marker-alt"
                                              className="mr-1"
                                            />
                                            {page.locationName}
                                          </p>
                                        )}
                                      </MDBCardText>
                                    </MDBCardBody>
                                  </MDBCard>
                                </Link>
                              </MDBCol>
                            </>
                          );
                        })}
                    </MDBRow>
                  </Fade>
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

Vermietung.getInitialProps = async () => {
  const client = await getStandaloneApolloClient();

  const { data } = await client.query({
    query: GET_EVERYTHING,
  });

  return {
    data,
  };
};
//#endregion

//#region > Exports
export default Vermietung;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
