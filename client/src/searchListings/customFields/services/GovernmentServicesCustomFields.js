/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable GovernmentServices custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';

const GOVERNMENT_SERVICES_Custom_Fields_TEXT = {
    contactPerson: "Contact Person",
    phoneNumber: "Phone number with ability to add extension if applicable"
}

const GovernmentServicesCustomFields = (props) =>{
    const { title, contactPerson, phoneNumber } = props;

    return(
        <div>
            <h1> {title} </h1> <br/>
            <p>{GOVERNMENT_SERVICES_Custom_Fields_TEXT.contactPerson} {contactPerson}</p> <br/>
            <p>{GOVERNMENT_SERVICES_Custom_Fields_TEXT.phoneNumber} {phoneNumber}</p> <br/>
        </div>
    );
}

GovernmentServicesCustomFields.propTypes = {
    title: PropTypes.string.isRequired,
    contactPerson: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string
}

export default GovernmentServicesCustomFields;