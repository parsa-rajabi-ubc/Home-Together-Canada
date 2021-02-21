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
    CONTACT_PERSON: "Contact Person",
    PHONE_NUMBER: "Phone number with ability to add extension if applicable"
}

const GovernmentServicesCustomFields = (props) =>{
    const { title, contactPerson, phoneNumber } = props;

    return(
        <div>
            <h1> {title} </h1>
            <p>{GOVERNMENT_SERVICES_Custom_Fields_TEXT.CONTACT_PERSON} {contactPerson}</p>
            <p>{GOVERNMENT_SERVICES_Custom_Fields_TEXT.PHONE_NUMBER} {phoneNumber}</p>
        </div>
    );
}

GovernmentServicesCustomFields.propTypes = {
    title: PropTypes.string.isRequired,
    contactPerson: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string
}

export default GovernmentServicesCustomFields;