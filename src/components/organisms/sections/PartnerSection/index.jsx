//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
//#endregion

//#region > Components
class PartnerSection extends React.Component {
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
      <section id="partners" className="py-4">
        <MDBContainer className="text-center">
          <MDBRow className="flex-center">
            {data?.partners &&
              data.partners.map((partner, p) => {
                const partnerImg = this.mapImage(partner.value.partner_img);

                return (
                  <MDBCol lg="3" key={"partner-" + p}>
                    <img
                      src={
                        partnerImg[0]
                          ? process.env.NEXT_PUBLIC_BASEURL + partnerImg[0].url
                          : undefined
                      }
                      alt=""
                      className="img-fluid"
                    />
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
export default PartnerSection;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
