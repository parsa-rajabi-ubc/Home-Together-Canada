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


function BusinessListingCard(props) {
    const {logo, title, businessName, shortDescription, datePosted} = props;

    return (
        <div>

        </div>
    );
}

BusinessListingCard.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
}


export default BusinessListingCard;
