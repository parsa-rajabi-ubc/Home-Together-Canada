/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable House Services custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../../images/HTC_Logo.jpg";

const HOUSE_SERVICES_CUSTOM_FIELDS_TEXT = {
    RATE_AND_FEES: "Rates and fees (CAD)",
    PICTURES: "Pictures"
}

const HouseServicesCustomFields = (props) => {
    const { rateAndFees, pictures} = props;

    return (
        <div>
            <label className={"label-result"}>{HOUSE_SERVICES_CUSTOM_FIELDS_TEXT.RATE_AND_FEES}</label>
            <p> {rateAndFees}</p>

            <label className={"label-result"}>{HOUSE_SERVICES_CUSTOM_FIELDS_TEXT.PICTURES}</label>

            {/*TODO: replace HTC_Logo with picture string from DB*/}
            <img src={HTC_Logo} alt={""}/>
        </div>
    );
}

HouseServicesCustomFields.propTypes = {
    rateAndFees: PropTypes.string.isRequired,
    pictures: PropTypes.string.isRequired
}

export default HouseServicesCustomFields;