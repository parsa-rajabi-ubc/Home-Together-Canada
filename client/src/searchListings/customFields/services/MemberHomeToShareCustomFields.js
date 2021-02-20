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

const MemberHomeToShareCustomFields = (props) =>{
    const { reset } = props;
    const title = useState(reset.title);
    const generalLocationText = useState(reset.generalLocationText);
    const homeShareMonthlyCost = useState(reset.homeShareMonthlyCost);
    const numBed = useState(reset.numBed);
    const numBath = useState(reset.numBath);
    const utilIncluded = useState(resolveBooleanToYesNo(reset.utilIncluded));
    const petFriendly = useState(resolveBooleanToYesNo(reset.petFriendly));
    const smokeFriendly = useState(resolveBooleanToYesNo(reset.smokeFriendly));
    const photos = useState(reset.photos);

        return(
            <div>
                <h1 className={"page-title mb-5"}> {title} </h1> <br/>
                <p>General Location: {generalLocationText}</p> <br/>
                <p>Home share monthly cost: {homeShareMonthlyCost} ($CAD)</p> <br/>
                <p>Number of bedrooms available in home: {numBed}</p> <br/>
                <p>Number of bathrooms in house: {numBath}</p> <br/>
                <p>Utilities included: {utilIncluded}</p> <br/>
                <p>Pet friendly: {petFriendly}</p> <br/>
                <p>Smoking: {smokeFriendly}</p> <br/>
                <p>Photos: </p> <br/>
                {/*TODO: replace HTC_Logo with photos*/}
                <img className={"float-left w-24 h-auto mx-4 "} src={HTC_Logo} alt={""}/>
                <button className={"btn btn-green mb-6 w-1/2 text-base py-2"}>Giving Rate</button>
            </div>
        );
}

MemberHomeToShareCustomFields.propTypes = {
    reset: PropTypes.shape({
        title: PropTypes.string.isRequired,
        generalLocationText: PropTypes.string.isRequired,
        homeShareMonthlyCost: PropTypes.number.isRequired,
        numBed: PropTypes.string.isRequired,
        numBath: PropTypes.string.isRequired,
        utilIncluded: PropTypes.bool.isRequired,
        petFriendly: PropTypes.bool.isRequired,
        smokeFriendly: PropTypes.bool.isRequired,
        photos: PropTypes.string.isRequired,
    }).isRequired,
}

export default MemberHomeToShareCustomFields;