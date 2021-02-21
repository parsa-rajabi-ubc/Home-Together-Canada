/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable Member Home to share custom fields.
 *
 */
import PropTypes from "prop-types";
import React, {useState} from 'react';
import HTC_Logo from "../../../../images/HTC_Logo.jpg";
import {resolveBooleanToYesNo} from "../../../../common/utils/generalUtils";

const MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT= {
    GENERAL_LOCATION: "General Location",
    HOME_SHARE_MONTHLY_COST: "Home share monthly cost ($CAD)",
    NUMBER_BEDROOM: "Number of bedrooms available in home",
    NUMBER_BATHROOM: "Number of bathrooms in house",
    UTIL_INCLUDE: "Utilities included",
    PET_FRIENDLY: "Pet friendly",
    SMOKE_FRIENDLY: "Smoking",
    PHOTOS: "Photos"
}

const MemberHomeToShareCustomFields = (props) =>{
    const {generalLocationText, homeShareMonthlyCost, numBath, numBed, petFriendly, photos, smokeFriendly, utilIncluded } = props;

    const isUtilIncluded = useState(resolveBooleanToYesNo(utilIncluded));
    const isPetFriendly = useState(resolveBooleanToYesNo(petFriendly));
    const isSmokeFriendly = useState(resolveBooleanToYesNo(smokeFriendly));

        return(
            <div>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.GENERAL_LOCATION} {generalLocationText}</p>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.HOME_SHARE_MONTHLY_COST} {homeShareMonthlyCost}</p>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.NUMBER_BEDROOM} {numBed}</p>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.NUMBER_BATHROOM} {numBath}</p>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.UTIL_INCLUDE} {isUtilIncluded}</p>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.PET_FRIENDLY} {isPetFriendly}</p>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.SMOKE_FRIENDLY} {isSmokeFriendly}</p>
                <p>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.PHOTOS}</p>
                {/*TODO: replace HTC_Logo with photos*/}
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