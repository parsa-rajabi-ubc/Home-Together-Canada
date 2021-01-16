/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const array for Dropdown Component.
 *
 */

import React from 'react';
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";

const shareLimits = [
    {
        label: "1 other person",
        value: 1
    },
    {
        label: "2 other people",
        value: 2
    },
    {
        label: "3 other people",
        value: 3
    },
    {
        label: "4 other people",
        value: 4
    },
    {
        label: "Any number of people",
        value: -1
    }
]

function ShareLimit(props) {
    const {onChange, dropdownCSS, isMulti = false, currentSelectedValue} = props;

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
                placeholder={"Number of People to Share With"}
                options={shareLimits}
                onChange={isMulti ? handleInputChange : onChange}
                dropdownCSS={dropdownCSS}
                isMulti={isMulti}
                currentSelectedValue={currentSelectedValue}
            />
        </div>
    );
}

ShareLimit.propTypes = {
    onChange: PropTypes.func,
    dropdownCSS: PropTypes.object,
    isMulti: PropTypes.bool,
    currentSelectedValue: PropTypes.any
};

export default ShareLimit;
