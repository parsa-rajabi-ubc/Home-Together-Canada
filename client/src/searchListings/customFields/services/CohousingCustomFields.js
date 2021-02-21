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
    contactName: "Contant Name",
    unitsForSale: "Units for sale",
    unitsForRent: "Units for rent"
}

const CohousingCustomFields = (props) =>{
    const { title, contactName, unitsForSale, unitsForRent } = props;

    return(
        <div>
            <h1> {title} </h1> <br/>
            <p>{CO_HOUSING_CUSTOM_FIELD_TEXT.contactName} {contactName}</p> <br/>
            <p>{CO_HOUSING_CUSTOM_FIELD_TEXT.unitsForSale} {unitsForSale}</p> <br/>
            <p>{CO_HOUSING_CUSTOM_FIELD_TEXT.unitsForRent} {unitsForRent}</p> <br/>
        </div>
    );
}

CohousingCustomFields.propTypes = {
    title: PropTypes.string.isRequired,
    contactName: PropTypes.string.isRequired,
    unitsForSale: PropTypes.number.isRequired,
    unitsForRent: PropTypes.number.isRequired
}

export default CohousingCustomFields;