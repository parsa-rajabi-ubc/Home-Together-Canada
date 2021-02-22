/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable Events custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../../images/HTC_Logo.jpg";

const EVENTS_CUSTOM_FIELDS_TEXT = {
    RATE_AND_FEES: "Rates and fees (CAD)",
    CONTACT_NAME: "Contact Name",
    CONTACT_NUMBER: "Contact Phone Number",
    EVENTS_DATE_AND_TIME: "Event dates and times",
    PICTURES: "Pictures"
}

const EventsCustomFields = (props) => {
    const { rateAndFees, contactName, contactNumber, eventDateTime, pictures} = props;

    return (
        <div>
            <label className={"label-result"}>{EVENTS_CUSTOM_FIELDS_TEXT.RATE_AND_FEES}</label>
            <p> {rateAndFees}</p>

            <label className={"label-result"}>{EVENTS_CUSTOM_FIELDS_TEXT.CONTACT_NAME}</label>
            <p> {contactName}</p>

            <label className={"label-result"}>{EVENTS_CUSTOM_FIELDS_TEXT.CONTACT_NUMBER}</label>
            <p> {contactNumber}</p>

            <label className={"label-result"}>{EVENTS_CUSTOM_FIELDS_TEXT.EVENTS_DATE_AND_TIME}</label>
            <p> {eventDateTime}</p>

            <label className={"label-result"}>{EVENTS_CUSTOM_FIELDS_TEXT.PICTURES}</label>

            {/*TODO: replace HTC_Logo with picture string from DB*/}
            <img src={HTC_Logo} alt={""}/>
        </div>
    );
}

EventsCustomFields.propTypes = {
    rateAndFees: PropTypes.string.isRequired,
    contactName: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    eventDateTime: PropTypes.string.isRequired,
    pictures: PropTypes.string.isRequired
}

export default EventsCustomFields;