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
        <div className={"relative text-right my-10 mx-32"}>
            <div className={"inline-block text-left mx-10"}>
                <section className={"my-3"}>
                    <label className={"label text-lg text-orange-600"}>{BUSINESS_INFO_TEXT.TITLE} </label>
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
            </div>
            <img src={logo} alt={BUSINESS_INFO_TEXT.TITLE + "'s logo"} className={"inline-block align-top"}/>


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
