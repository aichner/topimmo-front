//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React Router DOM bindings
import Link from "next/link";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBContainer,
} from "mdbreact";

//> CSS
import "./navbar.module.scss";
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
    return (
      <header>
        <MDBNavbar light expand="md" scrolling fixed="top">
          <MDBContainer fluid>
            <Link href="/">
              <span className="navbar-brand">
                <p>Logo</p>
              </span>
            </Link>
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
                    href="/me"
                    onClick={this.state.collapse ? this.onClick : undefined}
                  >
                    <a className="nav-link">Meine Röstung</a>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link
                    href="/products"
                    onClick={this.state.collapse ? this.onClick : undefined}
                  >
                    <a className="nav-link">Produkte</a>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link
                    href="/profile"
                    onClick={this.state.collapse ? this.onClick : undefined}
                  >
                    <a className="nav-link">Konto</a>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link
                    href="/cart"
                    onClick={this.state.collapse ? this.onClick : undefined}
                  >
                    <a className="nav-link">
                      <span className="d-flex align-items-center">
                        <MDBIcon
                          icon="shopping-basket"
                          className="mr-1 d-inline-block"
                        />
                        Warenkorb
                      </span>
                    </a>
                  </Link>
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
export default Navbar;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
