/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-usable HomeServiceBusiness custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';

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

            {/*TODO: replace HTC_Logo with picture string from DB*/}
            {/*<label className={"label-result"}>{HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT.PICTURES}</label>*/}
        </div>
    );
}

HomeServiceBusinessCustomFields.propTypes = {
    rateAndFees: PropTypes.string.isRequired,
    pictures: PropTypes.string
}

export default HomeServiceBusinessCustomFields;