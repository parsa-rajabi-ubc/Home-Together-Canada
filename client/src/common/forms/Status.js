/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Status Component for Member Profile
 *
 */

import React from 'react';
import propTypes from "prop-types";
import Dropdown from "./Dropdown";
import {STATUSES} from "../constants/memberConstants";

const statuses = [
    {
        label: STATUSES.SINGLE,
        value: STATUSES.SINGLE
    },
    {
        label: STATUSES.COUPLE,
        value: STATUSES.COUPLE
    },
    {
        label: STATUSES.COUPLE_WITH_CHILDREN,
        value: STATUSES.COUPLE_WITH_CHILDREN
    },
    {
        label: STATUSES.SINGLE_PARENT,
        value: STATUSES.SINGLE_PARENT
    },
    {
        label: STATUSES.EXISTING_GROUP,
        value: STATUSES.EXISTING_GROUP
    }
]


function Status(props) {
    const {givenSelection, onChange, dropdownCSS, isDropdownMulti = false, currentSelectedValue} = props;
    const initialSelection = (givenSelection && {label: givenSelection, value: givenSelection}) || undefined;

    const handleInputChange = (e) => {
        let values = [];
        for (let val in e) {
            values.push(e[val].value);
        }
        onChange(values);
    }

    return (
        <div>
            <Dropdown
                isSearchable={true}
                placeholder={"Family Status"}
                options={statuses}
                onChange={isDropdownMulti ? handleInputChange : onChange}
                dropdownCSS={dropdownCSS}
                initialSelection={initialSelection}
                currentSelectedValue={currentSelectedValue}
                isMulti={isDropdownMulti}
            />
        </div>
    );
}

Status.propTypes = {
    onChange: propTypes.func,
    dropdownCSS: propTypes.object,
    isDropdownMulti: propTypes.bool,
    givenSelection: propTypes.string,
    currentSelectedValue: propTypes.any
};


export default Status;