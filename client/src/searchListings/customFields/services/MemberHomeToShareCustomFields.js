/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable Member Home to share custom fields.
 *
 */
import PropTypes from "prop-types";
import React, {useState} from 'react';
import HTC_Logo from "../../../images/HTC_Logo.jpg";
import {resolveBooleanToYesNo} from "../../../common/utils/generalUtils";

const MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT= {
    generalLocation: "General Location",
    homeShareMonthlyCost: "Home share monthly cost ($CAD)",
    numBed: "Number of bedrooms available in home",
    numBath: "Number of bathrooms in house",
    utilIncluded: "Utilities included",
    petFriendly: "Pet friendly",
    smokeFriendly: "Smoking",
    photos: "Photos"
}

const MemberHomeToShareCustomFields = (props) =>{
    const { title, generalLocationText, homeShareMonthlyCost, numBath, numBed, petFriendly, photos, smokeFriendly, utilIncluded } = props;

    const isUtilIncluded = useState(resolveBooleanToYesNo(utilIncluded));
    const isPetFriendly = useState(resolveBooleanToYesNo(petFriendly));
    const isSmokeFriendly = useState(resolveBooleanToYesNo(smokeFriendly));

        return(
            <div>
                <h1> {title} </h1> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.generalLocation} {generalLocationText}</p> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.homeShareMonthlyCost} {homeShareMonthlyCost}</p> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.numBed} {numBed}</p> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.numBath} {numBath}</p> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.utilIncluded} {isUtilIncluded}</p> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.petFriendly} {isPetFriendly}</p> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.smokeFriendly} {isSmokeFriendly}</p> <br/>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.photos}</p> <br/>
                {/*TODO: replace HTC_Logo with photos*/}
                <img className={"float-left w-24 h-auto mx-4 "} src={HTC_Logo} alt={""}/>
            </div>
        );
}

MemberHomeToShareCustomFields.propTypes = {
    title: PropTypes.string.isRequired,
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