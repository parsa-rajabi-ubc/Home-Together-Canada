/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable HomeServiceBusiness custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../images/HTC_Logo.jpg";

const HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT = {
    rateAndFees: "Rates and fees ($CAD)",
    pictures: "Pictures (max of 6)"
}


const HomeServiceBusinessCustomFields = (props) =>{
    const { title, rateAndFees, pictures } = props;

    return(
        <div>
            <h1> {title} </h1> <br/>
            <p>{HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT.rateAndFees} {rateAndFees}</p> <br/>
            <p>{HOME_SERVICE_BUSINESS_CUSTOM_FIELDS_TEXT.pictures}</p> <br/>
            {/*TODO: replace HTC_Logo with pictures Pictures (max of 6)*/}
            <img className={"float-left w-24 h-auto mx-4 "} src={HTC_Logo} alt={""}/> <br/>
        </div>
    );
}

HomeServiceBusinessCustomFields.propTypes = {
    title: PropTypes.string.isRequired,
    rateAndFees: PropTypes.number.isRequired,
    pictures: PropTypes.string.isRequired
}

export default HomeServiceBusinessCustomFields;