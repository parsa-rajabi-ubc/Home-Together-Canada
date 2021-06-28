/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: Re-usable House Services custom fields.
 *
 */
import PropTypes from "prop-types";
import React from 'react';
import {ImageGallery} from "../../../../common/listings/ImageGallery";

const HOUSE_SERVICES_CUSTOM_FIELDS_TEXT = {
    RATE_AND_FEES: "Rates and fees (CAD)",
    PICTURES: "Pictures"
}

const HouseServicesCustomFields = (props) => {
    const { rateAndFees, pictures} = props;

    return (
        <div>
            <label className={"label-result"}>{HOUSE_SERVICES_CUSTOM_FIELDS_TEXT.RATE_AND_FEES}</label>
            <p> {rateAndFees}</p>

            {!!pictures.length &&
                <div>
                    <label className={"label-result"}>{HOUSE_SERVICES_CUSTOM_FIELDS_TEXT.PICTURES}</label>
                    <ImageGallery pictures={pictures}/>
                </div>
            }
        </div>
    );
}

HouseServicesCustomFields.propTypes = {
    rateAndFees: PropTypes.string.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string),
}

export default HouseServicesCustomFields;