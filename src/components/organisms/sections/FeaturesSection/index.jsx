//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
//#endregion

//#region > Components
class FeaturesSection extends React.Component {
  mapImage = (id) => {
    const { images } = this.props;

    return images.filter((img) => parseInt(img.id) === id);
  };

  render() {
    const { data } = this.props;

    return (
      <section id="features">
        <MDBContainer>
          <MDBRow className="justify-content-center">
            {data.features.map((col, c) => {
              const image = this.mapImage(col.value.feature_image);
              const urlLink = image
                ? process.env.REACT_APP_BASEURL + image[0].urlLink
                : null;

              return (
                <MDBCol md="4" className="text-center mb-3" key={c}>
                  <img
                    src={urlLink}
                    alt={col.value.feature_head + " image"}
                    className="img-fluid mb-3"
                  />
                  <p className="lead">{col.value.feature_head}</p>
                  {col.value.feature_lead && (
                    <>
                      <hr />
                      <p>{col.value.feature_lead}</p>
                    </>
                  )}
                </MDBCol>
              );
            })}
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
//#endregion

//#region > Exports
export default FeaturesSection;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
