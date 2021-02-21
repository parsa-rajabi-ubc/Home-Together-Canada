/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Business Listing Container
 *
 */

import React from 'react';
import PropTypes from "prop-types";

const BUSINESS_INFO_TEXT = {
    TITLE: "Business Info",
    WEBSITE: "Website",
    REPORT: "Report Listing"
}

function BusinessInfo(props) {
    const {
        logo,
        businessName,
        address,
        website,
        phone,
        email
    } = props;


    return (
        <div className={"float-right"}>
            <img src={logo} alt={BUSINESS_INFO_TEXT.TITLE + "'s logo"} className={""}/>
            <div className={"text-center"}>
                <section className={"my-3"}>
                    <label className={"label-result text-lg"}>{BUSINESS_INFO_TEXT.TITLE} </label>
                    <p className={"my-2"}>{businessName}</p>
                </section>

                <section className={"my-3"}>
                    <p>{address.streetLine1}</p>
                    <p>{address.streetLine2}</p>
                    <p>{address.city}, {address.province} </p>
                    <p>{address.postalCode}</p>

                    <p className={"my-2"}>{phone}</p>
                    <a href={"mailto:" + email} target="_blank" rel="noopener noreferrer" className={"link"}>{email}</a>
                    <a href={"https://" + website} target="_blank" rel="noopener noreferrer"
                       className={"link"}>{BUSINESS_INFO_TEXT.WEBSITE}</a>
                </section>

                <button className={"btn btn-red my-10 text-base px-0 py-2"}>
                    {BUSINESS_INFO_TEXT.REPORT}
                </button>
            </div>


        </div>
    );
}

BusinessInfo.propTypes = {
    logo: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
    address: PropTypes.shape({
        streetLine1: PropTypes.string.isRequired,
        streetLine2: PropTypes.string,
        city: PropTypes.string.isRequired,
        province: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
    }),
    website: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}

export default BusinessInfo;
