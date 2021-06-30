/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.19
 *
 * @Description: Business Listing Card
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import Moment from 'react-moment';
import HTC_Logo from "../../images/HTC_Logo.jpg";

function BusinessListingCard(props) {
    const {logo, title, businessName, shortDescription, datePosted} = props;

    return (
        <section className={"card-container mt-0"}>
            <img className={"float-left w-24 h-24 mx-4 "} src={logo ? logo : HTC_Logo}/>
            <div className={"inline align-middle "}>
                <label className={"font-semibold justify-between"}> {title} </label>
                {/*{shortDescription}*/}
                <section className={"inline float-right pr-6 justify-end"}>
                    <Moment format="MMM D, YYYY">{datePosted}</Moment>
                </section>
            </div>

            <div className={"mx-6 inline items-center justify-between leading-tight font-light"}>
                <section className={"mb-3"}> {businessName} </section>
                <section> {shortDescription} </section>

            </div>
        </section>
    );
}

BusinessListingCard.propTypes = {
    logo: PropTypes.string,
    title: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
}


export default BusinessListingCard;
