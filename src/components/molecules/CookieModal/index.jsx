//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router DOM bindings
import Link from "next/link";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBFormInline,
} from "mdbreact";
//#endregion

//#region > Components
class ModalPage extends React.Component {
  state = {
    modal1: undefined,
    essential: true,
    statistics: false,
    marketing: false,
  };

  componentDidMount = () => {
    this.setState({
      modal1: localStorage.getItem("cookie") ? false : true,
    });
  };

  checkBoxCheck(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  checkAll() {
    this.setState({ essential: true, statistics: true, marketing: true }, () =>
      this.save()
    );
  }

  save() {
    localStorage.setItem(
      "cookie",
      JSON.stringify({
        essential: this.state.essential ? true : false,
        statistics: this.state.statistics ? true : false,
        marketing: this.state.marketing ? true : false,
      })
    );

    this.setState({ modal1: false }, () => this.props.saveCookie());
  }

  toggle = (nr) => () => {
    const modalNumber = "modal" + nr;

    this.setState(
      {
        [modalNumber]: !this.state[modalNumber],
      },
      () => {
        if (!localStorage.getItem("cookie")) {
          localStorage.setItem("cookie", true);
        }
      }
    );
  };

  render() {
    return (
      <MDBModal
        isOpen={this.state.modal1}
        toggle={this.toggle(1)}
        disableFocusTrap={false}
        keyboard={false}
        className="cookie-modal"
      >
        <MDBModalBody className="text-center py-4">
          <h2>Cookie Einstellungen</h2>
          <p className="text-muted">
            Wir verwenden auf unserer Website Cookies, um die Benutzererfahrung
            zu verbessern. Einige davon sind essenziell für den Betrieb der
            Website.{" "}
            <Link href="/privacy" target="_blank">
              Details anzeigen
            </Link>
          </p>
          <div className="my-4">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="cookieEssential"
                checked={this.state.essential}
                disabled
              />
              <label className="custom-control-label" htmlFor="cookieEssential">
                Essenziell
              </label>
            </div>
            <MDBFormInline className="d-flex justify-content-center mt-2">
              <div className="custom-control custom-checkbox mr-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="cookieMarketing"
                  checked={this.state.marketing}
                  name="marketing"
                  onChange={(e) => this.checkBoxCheck(e)}
                />
                <label
                  className="custom-control-label"
                  htmlFor="cookieMarketing"
                >
                  Marketing
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="cookieStatistics"
                  name="statistics"
                  checked={this.state.statistics}
                  onChange={(e) => this.checkBoxCheck(e)}
                />
                <label
                  className="custom-control-label"
                  htmlFor="cookieStatistics"
                >
                  Statistiken
                </label>
              </div>
            </MDBFormInline>
          </div>
          <div className="d-block">
            <MDBBtn color="success" onClick={() => this.checkAll()}>
              <MDBIcon icon="check-circle" />
              Alle akzeptieren
            </MDBBtn>
            <MDBBtn color="white" size="sm" onClick={() => this.save()}>
              Auswahl speichern
            </MDBBtn>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Exports
export default ModalPage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
