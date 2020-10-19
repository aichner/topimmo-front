//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React Router DOM bindings
import Link from "next/link";
import { withRouter } from "next/router";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBSmoothScroll,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBContainer,
} from "mdbreact";

//> Images
import logoImage from "../../../static/svg/logo.svg";
//#endregion

//#region > Components
class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  getCartCount = () => {
    let totalcount = 0;

    this.props.checkout.lineItems.edges.forEach((le) => {
      totalcount += le.node.quantity;
    });

    return totalcount;
  };

  render() {
    const { router } = this.props;

    return (
      <header>
        <MDBNavbar light expand="md" scrolling fixed="top">
          <MDBContainer>
            <Link href="/">
              <img
                src={logoImage}
                alt="TopImmo Logo"
                className="navbar-brand clickable"
              />
            </Link>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <Link
                    href="/"
                    onClick={this.state.collapse ? this.onClick : undefined}
                  >
                    <a className="nav-link">Home</a>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link
                    href="/vermietung"
                    onClick={this.state.collapse ? this.onClick : undefined}
                  >
                    <a className="nav-link">Vermietung</a>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link
                    href="/verkauf"
                    onClick={this.state.collapse ? this.onClick : undefined}
                  >
                    <a className="nav-link">Verkauf</a>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  {router.route === "/" ? (
                    <MDBSmoothScroll
                      to="about"
                      onClick={this.state.collapse ? this.onClick : undefined}
                    >
                      Über mich
                    </MDBSmoothScroll>
                  ) : (
                    <Link
                      href="/#about"
                      onClick={this.state.collapse ? this.onClick : undefined}
                    >
                      <a className="nav-link">Über mich</a>
                    </Link>
                  )}
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </header>
    );
  }
}
//#endregion

//#region > Exports
export default withRouter(Navbar);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
