//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
//#endregion

//#region > Components
class HeadSection extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section id="features" className="mt-3 pb-1">
        <MDBContainer className="text-center">
          <h2>{data.contentCenterHead}</h2>
          <p className="lead">{data.contentCenterLead}</p>
          <p dangerouslySetInnerHTML={{ __html: data.contentCenterText }}></p>
        </MDBContainer>
      </section>
    );
  }
}
//#endregion

//#region > Exports
export default HeadSection;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
