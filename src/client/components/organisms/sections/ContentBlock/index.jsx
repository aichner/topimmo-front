//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBRow, MDBCol, MDBContainer } from "mdbreact";
//> Animations
import Slide from "react-reveal/Slide";

//> Images
import formSm from "../../../../static/svg/form_sm.svg";
//#endregion

//#region > Components
class ContentBlock extends React.Component {
  render() {
    const { data, orientation, id } = this.props;

    return (
      <section
        id={id ? id : "contentblock"}
        className="text-center py-4"
        style={{ backgroundColor: data.color ? data.color : "#ffffff" }}
      >
        <MDBContainer>
          <Slide left>
            {orientation === "left" && (
              <MDBRow>
                <MDBCol lg="5" className="mb-3 mb-sm-0">
                  {data.contentLeftImg && (
                    <img
                      src={
                        process.env.NEXT_PUBLIC_MEDIAURL +
                        data.contentLeftImg.url
                      }
                      alt=""
                      className="img-fluid"
                    />
                  )}
                </MDBCol>
                <MDBCol lg="7" className="text-left">
                  <p className="h3-responsive">{data.contentLeftHead}</p>
                  {data.contentLeftHead || data.contentLeftLead ? (
                    <img src={formSm} className="form-img mb-3" />
                  ) : null}
                  <p className="lead">{data.contentLeftLead}</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.contentLeftText }}
                  />
                </MDBCol>
              </MDBRow>
            )}
          </Slide>
          <Slide right>
            {orientation === "right" && (
              <MDBRow>
                <MDBCol lg="7" className="text-left">
                  <p className="h3-responsive">{data.contentRightHead}</p>
                  {data.contentRightHead || data.contentRightLead ? (
                    <img src={formSm} className="form-img mb-3" />
                  ) : null}
                  <p className="lead">{data.contentRightLead}</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.contentRightText }}
                  />
                </MDBCol>
                <MDBCol lg="5" className="mb-3 mb-sm-0">
                  {data.contentRightImg && (
                    <img
                      src={
                        process.env.NEXT_PUBLIC_MEDIAURL +
                        data.contentRightImg.url
                      }
                      alt=""
                      className="img-fluid"
                    />
                  )}
                </MDBCol>
              </MDBRow>
            )}
          </Slide>
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
