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
class Verkauf extends React.Component {
  render() {
    const { data } = this.props;
    const { pages } = data;

    const selectedPages = pages
      ? pages.length > 0
        ? pages.filter((p) => p.buyAvailable === true)
          ? pages.filter((p) => p.buyAvailable === true)
          : false
        : null
      : null;

    const flats = pages.filter((p) => p.__typename === "ProjectsFlatPage");

    return (
      <div className="flyout">
        <NextSeo
          title="Verkauf - TOP Immo"
          description="Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt."
          canonical="https://www.top-immo.org/verkauf"
          openGraph={{
            url: "https://www.top-immo.org/verkauf",
            title: "Verkauf - TOP Immo",
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
                    Verkauf
                  </MDBCardTitle>
                  <Fade bottom cascade>
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
                                          process.env.NEXT_PUBLIC_MEDIAURL +
                                          page.headers[0].slideImage.url
                                        }
                                        className="img-fluid"
                                      />
                                      {available ? (
                                        <MDBBadge color="success">
                                          Verfügbar
                                        </MDBBadge>
                                      ) : (
                                        <MDBBadge color="danger">
                                          Belegt
                                        </MDBBadge>
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
                        <div className="text-center white rounded p-3">
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
                  </Fade>
                </div>
              ) : (
                <>
                  <Fade bottom cascade>
                    {selectedPages === false ? (
                      <div className="text-center white rounded p-3">
                        <p className="lead">
                          Es stehen derzeit leider keine Objekte zum Verkauf.
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
                  </Fade>
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

Verkauf.getInitialProps = async () => {
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
export default Verkauf;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
