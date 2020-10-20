//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> Next
import Link from "next/link";
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

//> Images
import formLg from "../../../../static/svg/form_lg.svg";
//#endregion

//#region > Components
class HeroSection extends React.Component {
  getLink = (typename) => {
    switch (typename) {
      case "ProjectsProjectsPage":
        return "/project/";
      case "NewsNewsPage":
        return "/article/";
      case "ProjectsFlatPage":
        return "/item/";
      default:
        return "/";
    }
  };

  render() {
    const { data } = this.props;

    return (
      <section id="hero" className="mt-5">
        <MDBView>
          <MDBCarousel
            activeItem={1}
            length={data.length}
            showControls={data.length > 1 ? true : false}
            showIndicators={data.length > 1 ? true : false}
          >
            <MDBCarouselInner>
              {data.map((item, i) => {
                return (
                  <MDBCarouselItem itemId={i + 1} key={"hero-" + i}>
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
                          <img src={formLg} className="form-lg" />
                          <div>
                            <h3 className="hero-title">{item.slideHead}</h3>
                          </div>
                          <div>
                            {item.slidePage && item.slidePage.slug && (
                              <Link
                                href={
                                  this.getLink(item.slidePage.__typename) +
                                  item.slidePage.slug
                                }
                              >
                                <MDBBtn color="blue">Mehr dazu</MDBBtn>
                              </Link>
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
