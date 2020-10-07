//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer } from "mdbreact";
//#endregion

//#region > Components
class HeadSection extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section id="head" className="py-2">
        <MDBContainer className="text-center">
          <h2>{data.contentCenterHead}</h2>
          {data.contentCenterLead && (
            <p className={!data.contentCenterText ? "mb-0 lead" : "lead"}>
              {data.contentCenterLead}
            </p>
          )}
          {data.contentCenterText && (
            <p
              dangerouslySetInnerHTML={{ __html: data.contentCenterText }}
              className="mb-0"
            ></p>
          )}
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
