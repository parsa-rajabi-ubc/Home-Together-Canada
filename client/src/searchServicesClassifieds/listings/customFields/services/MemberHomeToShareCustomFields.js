/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-usable Member Home to share custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import {AiOutlineCheckCircle as Check, AiOutlineCloseCircle as Ex} from "react-icons/ai";
import {ImageGallery} from "../../../../common/listings/ImageGallery";

const MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT = {
    GENERAL_LOCATION: "General Location",
    HOME_SHARE_MONTHLY_COST: "Home Share Monthly Cost (CAD)",
    NUMBER_BEDROOM: "Number of Bedrooms",
    NUMBER_BATHROOM: "Number of Bathrooms",
    UTIL_INCLUDE: "Utilities included",
    PET_FRIENDLY: "Pet friendly",
    SMOKE_FRIENDLY: "Smoke friendly",
    PICTURES: "Pictures"
}

const MemberHomeToShareCustomFields = (props) => {
    const {
        streetLine1,
        streetLine2,
        city,
        province,
        postalCode,
        homeShareMonthlyCost,
        numBath,
        numBed,
        petFriendly,
        pictures,
        smokeFriendly,
        utilIncluded
    } = props;


    return (
        <div className={"flex"}>
            <div className={"flex-none w-9/12"}>
                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.GENERAL_LOCATION}</label>
                <p> {streetLine1} </p>
                <p> {streetLine2} </p>
                <p> {city}, {province} </p>
                <p> {postalCode} </p>

                <label
                    className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.HOME_SHARE_MONTHLY_COST}</label>
                <p> {homeShareMonthlyCost}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.NUMBER_BEDROOM}</label>
                <p> {numBed}</p>

                <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.NUMBER_BATHROOM}</label>
                <p> {numBath}</p>

                {!!pictures.length &&
                    <div>
                        <label className={"label-result"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.PICTURES}</label>
                        <ImageGallery pictures={pictures}/>
                    </div>
                }
            </div>


            <div className={"w-1/2"}>
                <table className={"table-auto mx-auto shadow-lg rounded-md"}>
                    <tbody>
                    <tr className={`${petFriendly && "bg-gray-200"}`}>
                        <td>
                            {petFriendly ?
                                <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                            }
                        </td>
                        <td className={"table-item"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.PET_FRIENDLY}</td>
                    </tr>

                    <tr className={`${smokeFriendly && "bg-gray-200"}`}>
                        <td>
                            {smokeFriendly ?
                                <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                            }
                        </td>
                        <td className={"table-item"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.SMOKE_FRIENDLY}</td>
                    </tr>

                    <tr className={`${utilIncluded && "bg-gray-200"}`}>
                        <td>
                            {utilIncluded ?
                                <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                            }
                        </td>
                        <td className={"table-item"}>{MEMBER_HOME_TO_SHARE_CUSTOM_FIELDS_TEXT.UTIL_INCLUDE}</td>
                    </tr>

                    </tbody>
                </table>

                <button className={"btn btn-red my-10 text-base py-2"}>Report User
                </button>
            </div>


        </div>
    );
}

MemberHomeToShareCustomFields.propTypes = {
    streetLine1: PropTypes.string.isRequired,
    streetLine2: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    homeShareMonthlyCost: PropTypes.number.isRequired,
    numBed: PropTypes.number.isRequired,
    numBath: PropTypes.number.isRequired,
    utilIncluded: PropTypes.bool.isRequired,
    petFriendly: PropTypes.bool.isRequired,
    smokeFriendly: PropTypes.bool.isRequired,
    pictures: PropTypes.string,
}

export default MemberHomeToShareCustomFields;