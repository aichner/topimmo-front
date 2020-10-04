//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React Router
import Link from "next/link";
// PropTypes
import PropTypes from "prop-types";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBFooter,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
//#endregion

//#region > Components
class Footer extends React.Component {
  state = {};

  render() {
    const { sections, images } = this.props;

    // Get trusted partners logos
    const trusted =
      sections &&
      sections.find(
        (section) => section.__typename === "Kaffeerudel_S_SmallTrustedBlock"
      );

    // Get payment methods logos
    const payment =
      sections &&
      sections.find(
        (section) => section.__typename === "Kaffeerudel_S_SmallTrustedPBlock"
      );

    return (
      <MDBFooter
        color="dark"
        className="font-small text-white pt-4 cloud-footer"
      >
        <MDBContainer className="text-md-left py-3">
          <MDBRow className="my-3 align-items-initial justify-content-center">
            <MDBCol lg="3">
              <p className="lead text-left mb-2">Kontakt</p>
            </MDBCol>
            <MDBCol md="3">
              <p className="lead text-left mb-2">Rechtliches</p>
              <Link href="/about">
                <li className="list-unstyled">Impressum</li>
              </Link>
              <Link href="/privacy">
                <li className="list-unstyled">Datenschutzerklärung</li>
              </Link>
              <Link href="/agb">
                <li className="list-unstyled">Nutzungsbedingungen</li>
              </Link>
            </MDBCol>
            <MDBCol md="3">
              <p className="lead text-left mb-2">Sicheres Gefühl</p>
              <Link href="/cancellation">
                <li className="list-unstyled">Widerruf</li>
              </Link>
              <Link href="/shipping">
                <li className="list-unstyled">
                  Versand- und Zahlungsinformationen
                </li>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3 text-white">
          <MDBContainer fluid>
            <div>
              &copy; {new Date().getFullYear()} Copyright: TOP Immo W.M.
              Treuhand GmbH
              <p className="my-2 font-weight-bold">
                Made with
                <i
                  className="fas fa-heart pulse blue-text ml-1 mr-1"
                  aria-hidden="true"
                ></i>
                by
                <a
                  href="https://www.inspiremedia.at/?ref=topimmo"
                  target="_blank"
                  className="ml-1 blue-text underlined"
                  rel="noopener noreferrer"
                >
                  InspireMedia GmbH
                </a>
              </p>
            </div>
            <div>
              <small className="text-muted">
                Stable release
                <span className="pl-2 pr-2">·</span>
                Version v{process.env.NEXT_PUBLIC_VERSION}
                <span className="pl-2 pr-2">·</span>
                <a
                  href="https://github.com/aichner/topimmo-front"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-muted"
                >
                  <MDBIcon fab icon="github" className="pr-2" />
                  View on GitHub
                </a>
                <span className="pl-2 pr-2">·</span>
                <a
                  href="https://github.com/aichner/topimmo-front/issues/new?template=bug_report.md"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-muted"
                >
                  <MDBIcon icon="bug" className="pr-2" />
                  Report bug
                </a>
              </small>
            </div>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}
//#endregion

//#region > PropTypes
Footer.propTypes = {
  sections: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
};
//#endregion

//#region > Exports
export default Footer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
