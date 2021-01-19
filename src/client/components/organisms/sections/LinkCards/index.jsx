//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
//#endregion

//#region > Components
class LinkCards extends React.Component {
  mapImage = (id) => {
    const { images } = this.props;

    if (images) {
      return images.filter((img) => parseInt(img.id) === id);
    } else {
      return false;
    }
  };

  render() {
    const { data } = this.props;

    return (
      <section id="features" className="pt-5 pb-4">
        <MDBContainer>
          <MDBRow className="justify-content-center">
            {data.features.map((col, c) => {
              const image = this.mapImage(col.value.feature_image);
              const urlLink = image
                ? process.env.NEXT_PUBLIC_MEDIAURL + image[0].url
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
                  {col.value.feature_text && (
                    <>
                      <hr />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: col.value.feature_text,
                        }}
                      ></div>
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
export default LinkCards;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
