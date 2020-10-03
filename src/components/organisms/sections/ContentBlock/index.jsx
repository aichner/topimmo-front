//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBRow, MDBCol, MDBContainer } from "mdbreact";
//#endregion

//#region > Components
class ContentBlock extends React.Component {
  mapImage = (id) => {
    const { images } = this.props;

    return images.filter((img) => img.id === id);
  };

  render() {
    const { data, orientation } = this.props;
    let image;

    if (orientation === "left") {
      image = this.mapImage(data.clImage.id);
    }
    if (orientation === "right") {
      image = this.mapImage(data.crImage.id);
    }

    const urlLink = image
      ? process.env.REACT_APP_BASEURL + image[0].urlLink
      : null;

    return (
      <section id="contentblock" className="text-center">
        <MDBContainer>
          {orientation === "left" && (
            <MDBRow>
              <MDBCol lg="5" className="mb-3 mb-sm-0">
                <img src={urlLink} alt="" className="img-fluid" />
              </MDBCol>
              <MDBCol
                lg="7"
                className={data.clCenter ? "text-center" : "text-left"}
              >
                <p className="h3-responsive">{data.clHead}</p>
                {data.clHead || data.clLead ? (
                  <hr align={data.clCenter ? "center" : "left"} />
                ) : null}
                <p className="lead">{data.clLead}</p>
                <p dangerouslySetInnerHTML={{ __html: data.clText }} />
                {data.clButton && (
                  <MDBBtn
                    color="special"
                    outline
                    href={data.clButton.buttonLink}
                    target="_blank"
                  >
                    {data.clButton.buttonTitle}
                  </MDBBtn>
                )}
              </MDBCol>
            </MDBRow>
          )}
          {orientation === "right" && (
            <MDBRow>
              <MDBCol
                lg="7"
                className={data.crCenter ? "text-center" : "text-left"}
              >
                <p className="h3-responsive">{data.crHead}</p>
                {data.crHead || data.crLead ? (
                  <hr align={data.crCenter ? "center" : "left"} />
                ) : null}
                <p className="lead">{data.crLead}</p>
                <p dangerouslySetInnerHTML={{ __html: data.crText }} />
                {data.crButton && (
                  <MDBBtn
                    color="special"
                    outline
                    href={data.crButton.buttonLink}
                    target="_blank"
                  >
                    {data.crButton.buttonTitle}
                  </MDBBtn>
                )}
              </MDBCol>
              <MDBCol lg="5" className="mb-3 mb-sm-0">
                <img src={urlLink} alt="" className="img-fluid" />
              </MDBCol>
            </MDBRow>
          )}
        </MDBContainer>
      </section>
    );
  }
}
//#endregion

//#region > Exports
export default ContentBlock;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
