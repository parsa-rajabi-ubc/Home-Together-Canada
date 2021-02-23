/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable House Services custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';

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

            {/*TODO: replace HTC_Logo with picture string from DB*/}
            {/*<label className={"label-result"}>{HOUSE_SERVICES_CUSTOM_FIELDS_TEXT.PICTURES}</label>*/}
        </div>
    );
}

HouseServicesCustomFields.propTypes = {
    rateAndFees: PropTypes.string.isRequired,
    pictures: PropTypes.string
}

export default HouseServicesCustomFields;