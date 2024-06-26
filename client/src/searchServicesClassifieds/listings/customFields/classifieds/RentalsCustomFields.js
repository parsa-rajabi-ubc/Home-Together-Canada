/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable Rentals custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import {AiOutlineCheckCircle as Check, AiOutlineCloseCircle as Ex} from "react-icons/ai";
import {ImageGallery} from "../../../../common/listings/ImageGallery";

const RENTALS_CUSTOM_FIELDS_TEXT= {
    PRICE: "Price (CAD)",
    NUMBER_BEDROOM: "Number of Bedrooms",
    NUMBER_BATHROOM: "Number of Bathrooms",
    FURNISHED: "Furnished",
    PET_FRIENDLY: "Pet friendly",
    SMOKING_FRIENDLY: "Smoking friendly",
    PICTURES: "Pictures"
}

const RentalsCustomFields = (props) =>{
    const { price, numBath, numBed, petFriendly, pictures, smokingFriendly, furnished } = props;

    return (
        <div className={"flex"}>
            <div className={"flex-none w-9/12"}>
                <label
                    className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.PRICE}</label>
                <p>${price}</p>

                <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.NUMBER_BEDROOM}</label>
                <p> {numBed}</p>

                <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.NUMBER_BATHROOM}</label>
                <p> {numBath}</p>

                {!!pictures.length &&
                    <div>
                        <label className={"label-result"}>{RENTALS_CUSTOM_FIELDS_TEXT.PICTURES}</label>
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
                        <td className={"table-item"}>{RENTALS_CUSTOM_FIELDS_TEXT.PET_FRIENDLY}</td>
                    </tr>

                    <tr className={`${smokingFriendly && "bg-gray-200"}`}>
                        <td>
                            {smokingFriendly ?
                                <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                            }
                        </td>
                        <td className={"table-item"}>{RENTALS_CUSTOM_FIELDS_TEXT.SMOKING_FRIENDLY}</td>
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

            </div>

        </div>
    );
}

RentalsCustomFields.propTypes = {
    price: PropTypes.number.isRequired,
    numBed: PropTypes.number.isRequired,
    numBath: PropTypes.number.isRequired,
    furnished: PropTypes.bool.isRequired,
    petFriendly: PropTypes.bool.isRequired,
    smokingFriendly: PropTypes.bool.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string),
}

export default RentalsCustomFields;