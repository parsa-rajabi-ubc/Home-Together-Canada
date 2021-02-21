/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-usable GovernmentServices custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';

const GOVERNMENT_SERVICES_Custom_Fields_TEXT = {
    CONTACT_PERSON: "Contact Name",
    PHONE_NUMBER: "Contact Phone Number"
}

const GovernmentServicesCustomFields = (props) => {
    const {contactPerson, phoneNumber} = props;

    return (
        <div>
            <label className={"label-result"}>{GOVERNMENT_SERVICES_Custom_Fields_TEXT.CONTACT_PERSON}</label>
            <p> {contactPerson}</p>

            <label className={"label-result"}>{GOVERNMENT_SERVICES_Custom_Fields_TEXT.PHONE_NUMBER}</label>
            <p> {phoneNumber}</p>
        </div>
    );
}

GovernmentServicesCustomFields.propTypes = {
    contactPerson: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string
}

export default GovernmentServicesCustomFields;