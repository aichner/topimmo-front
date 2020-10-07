//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
//#endregion

//#region > Components
class HeroSection extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section id="hero" className="mt-5">
        <MDBView>
          <MDBCarousel
            activeItem={1}
            length={data.length}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
          >
            <MDBCarouselInner>
              {data.map((item, i) => {
                return (
                  <MDBCarouselItem itemId={i + 1}>
                    <MDBView>
                      <div
                        className="w-100 h-100 img-banner"
                        style={{
                          backgroundImage: `url("${
                            process.env.NEXT_PUBLIC_BASEURL +
                            item.slideImage.url
                          }")`,
                        }}
                      ></div>
                      <MDBMask
                        overlay="black-strong"
                        className="flex-center text-white text-center"
                      >
                        <div>
                          <div>
                            <h3>{item.slideHead}</h3>
                          </div>
                          <div>
                            {item.slideButton && (
                              <MDBBtn color="blue">
                                {item.slideButton.buttonTitle}
                              </MDBBtn>
                            )}
                          </div>
                        </div>
                      </MDBMask>
                    </MDBView>
                  </MDBCarouselItem>
                );
              })}
            </MDBCarouselInner>
          </MDBCarousel>
        </MDBView>
      </section>
    );
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
