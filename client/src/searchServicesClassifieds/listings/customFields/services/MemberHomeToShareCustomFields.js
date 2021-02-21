/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-usable Member Home to share custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../../images/HTC_Logo.jpg";

const MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT= {
    GENERAL_LOCATION: "General Location",
    HOME_SHARE_MONTHLY_COST: "Home Share Monthly Cost (CAD)",
    NUMBER_BEDROOM: "Number of Bedrooms",
    NUMBER_BATHROOM: "Number of Bathrooms",
    UTIL_INCLUDE: "Utilities included",
    PET_FRIENDLY: "Pet friendly",
    SMOKE_FRIENDLY: "Smoke friendly",
    PHOTOS: "Photos"
}

const MemberHomeToShareCustomFields = (props) =>{
    const {generalLocationText, homeShareMonthlyCost, numBath, numBed, petFriendly, photos, smokeFriendly, utilIncluded } = props;


        return(
            <div>
                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.GENERAL_LOCATION}</label>
                <p> {generalLocationText}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.HOME_SHARE_MONTHLY_COST}</label>
                <p> {homeShareMonthlyCost}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.NUMBER_BEDROOM}</label>
                <p> {numBed}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.NUMBER_BEDROOM}</label>
                <p> {numBed}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.NUMBER_BATHROOM}</label>
                <p> {numBath}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.UTIL_INCLUDE}</label>
                <p> {utilIncluded}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.PET_FRIENDLY}</label>
                <p> {petFriendly}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.SMOKE_FRIENDLY}</label>
                <p> {smokeFriendly}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.PICTURES}</label>

                {/*TODO: replace HTC_Logo with picture string from DB*/}
                <img src={HTC_Logo} alt={""}/>
            </div>
        );
}

MemberHomeToShareCustomFields.propTypes = {
    generalLocationText: PropTypes.string.isRequired,
    homeShareMonthlyCost: PropTypes.number.isRequired,
    numBed: PropTypes.string.isRequired,
    numBath: PropTypes.string.isRequired,
    utilIncluded: PropTypes.bool.isRequired,
    petFriendly: PropTypes.bool.isRequired,
    smokeFriendly: PropTypes.bool.isRequired,
    photos: PropTypes.string.isRequired,
}

export default MemberHomeToShareCustomFields;