//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
//#endregion

//#region > Components
class HeroSection extends React.Component {
  render() {
    const { data } = this.props;

    return <section id="hero" className="mt-3 pb-1"></section>;
  }
}
//#endregion

//#region > Exports
export default HeroSection;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
