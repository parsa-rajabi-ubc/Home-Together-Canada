/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable Agencies custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../images/HTC_Logo.jpg";

const AGENCIES_Custom_Fields_TEXT = {
    RATE_AND_FEES: "Rates and fees ($CAD)",
    PICTURES: "Pictures"
}

const AgenciesCustomFields = (props) => {
    const { rateAndFees, pictures} = props;

    return (
        <div>
            <label className={"label-result"}>{AGENCIES_Custom_Fields_TEXT.RATE_AND_FEES}</label>
            <p> {rateAndFees}</p>

            <label className={"label-result"}>{AGENCIES_Custom_Fields_TEXT.PICTURES}</label>

            {/*TODO: replace HTC_Logo with picture string from DB*/}
            <img src={HTC_Logo} alt={""}/>
        </div>
    );
}

AgenciesCustomFields.propTypes = {
    rateAndFees: PropTypes.number.isRequired,
    pictures: PropTypes.string.isRequired
}

export default AgenciesCustomFields;