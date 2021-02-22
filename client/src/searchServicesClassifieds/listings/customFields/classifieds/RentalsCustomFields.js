/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable Rentals custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import HTC_Logo from "../../../../images/HTC_Logo.jpg";
import {AiOutlineCheckCircle as Check, AiOutlineCloseCircle as Ex} from "react-icons/ai";

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

    return (
        <div className={"flex"}>
            <div className={"flex-none w-9/12"}>
                <label
                    className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.PRICE}</label>
                <p> {price}</p>

                <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.NUMBER_BEDROOM}</label>
                <p> {numBed}</p>

                <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.NUMBER_BATHROOM}</label>
                <p> {numBath}</p>

                <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.PICTURES}</label>

                {/*TODO: replace HTC_Logo with picture string from DB*/}
                <img src={HTC_Logo} alt={""}/>
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
                        <td className={"table-item"}>{RENTALS_CUSTOM_FIELDS_TEXT.PET_FRIENDLY}</td>
                    </tr>

                    <tr className={`${smoking && "bg-gray-200"}`}>
                        <td>
                            {smoking ?
                                <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                            }
                        </td>
                        <td className={"table-item"}>{RENTALS_CUSTOM_FIELDS_TEXT.SMOKING}</td>
                    </tr>

                    <tr className={`${furnished && "bg-gray-200"}`}>
                        <td>
                            {furnished ?
                                <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                            }
                        </td>
                        <td className={"table-item"}>{RENTALS_CUSTOM_FIELDS_TEXT.FURNISHED}</td>
                    </tr>

                    </tbody>
                </table>

                <button className={"btn btn-red my-10 text-base py-2"}>Report User
                </button>
            </div>

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