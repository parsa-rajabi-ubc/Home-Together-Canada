/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable Rentals custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../images/HTC_Logo.jpg";

const RENTALS_CUSTOM_FIELDS_TEXT= {
    PRICE: "Price (CAD)",
    NUMBER_BEDROOM: "Number of Bedrooms",
    NUMBER_BATHROOM: "Number of Bathrooms",
    FURNISHED: "Furnished",
    PET_FRIENDLY: "Pet friendly",
    SMOKING: "Smoking",
    PICTURES: "Pictures"
}

const RentalsCustomFields = (props) =>{
    const { price, numBath, numBed, petFriendly, pictures, smoking, furnished } = props;


    return(
        <div>
            <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.PRICE}</label>
            <p> {price}</p>

            <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.NUMBER_BEDROOM}</label>
            <p> {numBed}</p>

            <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.NUMBER_BATHROOM}</label>
            <p> {numBath}</p>

            <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.FURNISHED}</label>
            <p> {furnished}</p>

            <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.PET_FRIENDLY}</label>
            <p> {petFriendly}</p>

            <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.SMOKING}</label>
            <p> {smoking}</p>

            <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.PICTURES}</label>

            {/*TODO: replace HTC_Logo with picture string from DB*/}
            <img src={HTC_Logo} alt={""}/>
        </div>
    );
}

RentalsCustomFields.propTypes = {
    price: PropTypes.number.isRequired,
    numBed: PropTypes.string.isRequired,
    numBath: PropTypes.string.isRequired,
    furnished: PropTypes.bool.isRequired,
    petFriendly: PropTypes.bool.isRequired,
    smoking: PropTypes.bool.isRequired,
    pictures: PropTypes.string.isRequired,
}

export default RentalsCustomFields;