/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable HomeServiceBusiness custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../../images/HTC_Logo.jpg";

const HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT = {
    RATE_AND_FEES: "Rates and fees ($CAD)",
    PICTURES: "Pictures (max of 6)"
}


const HomeServiceBusinessCustomFields = (props) =>{
    const { rateAndFees, pictures } = props;

    return(
        <div>
            <p>{HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT.RATE_AND_FEES} {rateAndFees}</p>
            <p>{HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT.PICTURES}</p>
            {/*TODO: replace HTC_Logo with pictures Pictures (max of 6)*/}
            <img src={HTC_Logo} alt={""}/>
        </div>
    );
}

HomeServiceBusinessCustomFields.propTypes = {
    rateAndFees: PropTypes.number.isRequired,
    pictures: PropTypes.string.isRequired
}

export default HomeServiceBusinessCustomFields;