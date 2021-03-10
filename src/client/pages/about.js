//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> SEO
import { NextSeo } from "next-seo";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBSpinner } from "mdbreact";

//> Queries
import { PAGE_QUERY } from "../queries";
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
class About extends React.Component {
  render() {
    const { data } = this.props;
    const { pages } = data;

    const page = pages.filter((p) => p.__typename === "HomeHomePage")[0];

    return (
      <div className="flyout">
        <NextSeo
          title="Impressum - TOP Immo"
          description="Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt."
          canonical="https://www.top-immo.org/about"
          openGraph={{
            url: "https://www.top-immo.org/about",
            title: "Impressum - TOP Immo",
            description:
              "Leistbar, top Qualität, top Lage. Das sind die Ansprüche der TOP Immo W.M. Treuhand GmbH als Bauträger am österreichischen Immobilienmarkt.",
            site_name: "TopImmo",
          }}
        />
        <Navbar />
        <main>
          <MDBContainer className="mt-5 pt-5">
            {page ? (
              <div dangerouslySetInnerHTML={{ __html: page.about }}></div>
            ) : (
              <div className="text-center">
                <MDBSpinner blue />
              </div>
            )}
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

About.getInitialProps = async () => {
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
export default About;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
