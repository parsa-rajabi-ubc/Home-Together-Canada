/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Year component for member regi.
 *
 */

import React from 'react';
import Dropdown from "./Dropdown";
import propTypes from "prop-types";

function BirthYear(props) {
    const {onChange} = props;

    const currentYear = new Date().getFullYear();
    const YEARS = [];

    for (let j = 0, i = currentYear - 16; i >= currentYear - 100; i--, j++) {
        YEARS.push({
                label: i,
                value: i
            }
        )
    }
    return (
        // Updated autoComplete based on: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
        <div>
            <Dropdown isSearchable={true} placeholder={"Select the Year You Were Born"}
                      options={YEARS} autoComplete="bday-year"
                      onChange={onChange}/>
        </div>

    )
}

BirthYear.propTypes = {
    onChange: propTypes.func
};

export default BirthYear;
