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

//> CSS
import "./footer.module.scss";
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
        color="white"
        className="font-small text-dark pt-4 cloud-footer"
      >
        <MDBContainer className="text-center text-md-left py-3">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="5" className="text-left">
              <p className="font-weight-bold lead mb-2">Zahlungsarten</p>
              <div className="payment">
                {payment &&
                  payment.trustedPaymentmethods.map((method, i) => {
                    return (
                      <a
                        href={
                          method.value.partner_link
                            ? method.value.partner_link
                            : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                      >
                        <img
                          src={
                            process.env.REACT_APP_BASEURL +
                            images.find((image) => {
                              return (
                                parseInt(image.id) === method.value.partner_logo
                              );
                            }).urlLink
                          }
                          alt="Payment method"
                        />
                      </a>
                    );
                  })}
              </div>
            </MDBCol>
            <MDBCol md="4" className="text-left">
              <p className="font-weight-bold lead mb-2">
                Bei uns kaufen Sie sicher
              </p>
              <div className="trusted">
                {trusted &&
                  trusted.trustedPartner.map((partner, i) => {
                    return (
                      <a
                        href={
                          partner.value.partner_link
                            ? partner.value.partner_link
                            : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                      >
                        <img
                          src={
                            process.env.REACT_APP_BASEURL +
                            images.find((image) => {
                              return (
                                parseInt(image.id) ===
                                partner.value.partner_logo
                              );
                            }).urlLink
                          }
                          alt="Partner"
                        />
                      </a>
                    );
                  })}
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="flex-center my-3 align-items-initial">
            <MDBCol md="3" className="text-center">
              <p className="font-weight-bold lead text-left mb-2">
                Rechtliches
              </p>
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
            <MDBCol md="3" className="text-center">
              <p className="font-weight-bold lead text-left mb-2">
                Sicheres Gefühl
              </p>
              <Link href="/cancellation">
                <li className="list-unstyled">Widerruf</li>
              </Link>
              <Link href="/shipping">
                <li className="list-unstyled">
                  Versand- und Zahlungsinformationen
                </li>
              </Link>
            </MDBCol>
            <MDBCol md="3" className="text-left">
              <p className="font-weight-bold lead text-left mb-2">
                Kundensupport
              </p>
              <p>+43 660 4590412</p>
              <p className="font-weight-bold mt-3">Kontakt über Facebook</p>
              <div>
                <a
                  href="https://www.facebook.com/bluelupi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MDBBtn color="blue" className="w-100 m-0">
                    <MDBIcon fab icon="facebook-messenger" />
                    Facebook Messenger
                  </MDBBtn>
                </a>
              </div>
              <p className="font-weight-bold mt-3">Kontakt per E-Mail</p>
              <div>
                <a href="mailto:office@kaffeerudel.at">
                  <MDBBtn color="elegant" className="w-100 m-0">
                    <MDBIcon far icon="envelope" />
                    E-Mail
                  </MDBBtn>
                </a>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3 text-dark">
          <MDBContainer fluid>
            <div>
              &copy; {new Date().getFullYear()} Copyright: TOP Immo W.M.
              Treuhand GmbH
              <p className="my-2 font-weight-bold">
                Made with
                <i
                  className="fas fa-heart pulse red-text ml-1 mr-1"
                  aria-hidden="true"
                ></i>
                by
                <a
                  href="https://www.inspiremedia.at/?ref=topimmo"
                  target="_blank"
                  className="ml-1 text-dark underlined"
                  rel="noopener noreferrer"
                >
                  InspireMedia GmbH
                </a>
              </p>
            </div>
            <div>
              <small>
                Stable release
                <span className="pl-2 pr-2">·</span>
                Version v{process.env.NEXT_PUBLIC_VERSION}
                <span className="pl-2 pr-2">·</span>
                <a
                  href="https://github.com/aichner/topimmo-front"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-dark"
                >
                  <MDBIcon fab icon="github" className="pr-2" />
                  View on GitHub
                </a>
                <span className="pl-2 pr-2">·</span>
                <a
                  href="https://github.com/aichner/topimmo-front/issues/new?template=bug_report.md"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-dark"
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
