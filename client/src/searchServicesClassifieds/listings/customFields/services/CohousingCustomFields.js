/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable Cohousing custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';

const CO_HOUSING_CUSTOM_FIELD_TEXT = {
    CONTACT_NAME: "Contact Name",
    UNITS_FOR_SALE: "Units for sale",
    UNITS_FOR_RENT: "Units for rent"
}

const CohousingCustomFields = (props) =>{
    const {contactName, unitsForSale, unitsForRent } = props;

    return(
        <div>
            <p>{CO_HOUSING_CUSTOM_FIELD_TEXT.CONTACT_NAME} {contactName}</p>
            <p>{CO_HOUSING_CUSTOM_FIELD_TEXT.UNITS_FOR_SALE} {unitsForSale}</p>
            <p>{CO_HOUSING_CUSTOM_FIELD_TEXT.UNITS_FOR_RENT} {unitsForRent}</p>
        </div>
    );
}

CohousingCustomFields.propTypes = {
    contactName: PropTypes.string.isRequired,
    unitsForSale: PropTypes.number.isRequired,
    unitsForRent: PropTypes.number.isRequired
}

export default CohousingCustomFields;