/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Deactivate Account Reasons
 *
 */

import React from 'react';
import Dropdown from "../../common/forms/Dropdown";
import propTypes from "prop-types";
import {dropdownDefaultCSS} from "../../css/dropdownCSSUtil";

function DeactivateAccountDropdown(props) {

    const {givenReason, onChange} = props;
    const initialSelection = (givenReason && {label: givenReason, value: givenReason}) || undefined;
    const REASONS = [
        {
            label: "Have found people to share with, am not able to find people",
            value: "Have found people to share with, am not able to find people"
        },
        {
            label: "Will be away for a while",
            value: "Will be away for a while"
        },
        {
            label: "Have changed my mind. I do not want to share",
            value: "Have changed my mind. I do not want to share"
        },
        {
            label: "Other",
            value: "Other"
        }
    ]

    return (
        // Updated autoComplete based on: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
        <div className={"mx-auto my-16 w-1/2 "}>
            <label className={"label"}> Reason for Deactivating Account </label>
            <Dropdown
                isSearchable={true}
                placeholder={"Select a Reason"}
                options={REASONS}
                dropdownCSS={dropdownDefaultCSS}
                onChange={onChange}
                initialSelection={initialSelection}
            />
        </div>

    )
}

DeactivateAccountDropdown.propTypes = {
    givenReason: propTypes.string,
    onChange: propTypes.func.isRequired,
};

export default DeactivateAccountDropdown;
