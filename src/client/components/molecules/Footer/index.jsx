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

//> Images
import formSm from "../../../static/svg/form_sm.svg";
import certificateImg from "../../../static/svg/bautraeger.svg";
//#endregion

//#region > Components
class Footer extends React.Component {
  state = {};

  render() {
    const { data } = this.props;

    return (
      <>
        <MDBFooter color="dark" className="font-small text-white cloud-footer">
          <div className="curve-med-dark" />
          <div className="footer-body">
            <MDBContainer className="text-md-left pb-3">
              <MDBRow className="mb-3 align-items-initial justify-content-center">
                <MDBCol lg="3">
                  <p className="lead text-left mb-0">Kontakt</p>
                  <img src={formSm} className="form-img" />
                  <p className="mb-0">{data && data.phone}</p>
                  <p className="mb-2">{data && data.email}</p>
                  <p className="mb-0">{data && data.address}</p>
                  <p className="mb-2">
                    {data && data.zipCode} {data && data.city}
                  </p>
                </MDBCol>
                <MDBCol md="3">
                  <p className="lead text-left mb-0">Links</p>
                  <img src={formSm} className="form-img" />
                  <Link href="/about">
                    <li className="list-unstyled">Impressum</li>
                  </Link>
                  <Link href="/privacy">
                    <li className="list-unstyled">Datenschutzerklärung</li>
                  </Link>
                </MDBCol>
                <MDBCol md="3">
                  <p className="lead text-left mb-0">Objekte</p>
                  <img src={formSm} className="form-img" />
                  <Link href="/vermietung">
                    <li className="list-unstyled">Vermietung</li>
                  </Link>
                  <Link href="/verkauf">
                    <li className="list-unstyled">Verkauf</li>
                  </Link>
                </MDBCol>
                <MDBCol md="3" className="d-sm-none d-block">
                  <img
                    src={certificateImg}
                    alt="Bauträger Staatlich geprüft"
                    className="img-fluid certificate"
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3 text-white">
              <MDBContainer fluid>
                <div>
                  &copy; {new Date().getFullYear()} Copyright:{" "}
                  {data && data.copyrightholder}
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
          </div>
        </MDBFooter>
      </>
    );
  }
}
//#endregion

//#region > Exports
export default Footer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
