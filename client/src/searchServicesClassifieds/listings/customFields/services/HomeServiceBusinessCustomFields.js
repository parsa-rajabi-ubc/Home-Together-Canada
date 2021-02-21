/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-usable HomeServiceBusiness custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../../images/HTC_Logo.jpg";

const HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT = {
    RATE_AND_FEES: "Rates and fees (CAD)",
    PICTURES: "Pictures"
}


const HomeServiceBusinessCustomFields = (props) =>{
    const { rateAndFees, pictures } = props;

    return(
        <div>
            <label className={"label-result"}>{HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT.RATE_AND_FEES}</label>
            <p> {rateAndFees}</p>

            <label className={"label-result"}>{HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT.PICTURES}</label>
            {/*TODO: replace HTC_Logo with picture string from DB*/}
            <img src={HTC_Logo} alt={""}/>
        </div>
    );
}

HomeServiceBusinessCustomFields.propTypes = {
    rateAndFees: PropTypes.string.isRequired,
    pictures: PropTypes.string.isRequired
}

export default HomeServiceBusinessCustomFields;