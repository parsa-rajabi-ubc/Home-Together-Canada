/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Year component for member registration.
 *
 */

import React from 'react';
import Dropdown from "./Dropdown";
import propTypes from "prop-types";

function BirthYear(props) {
    const {onChange} = props;

    const currentYear = new Date().getFullYear();
    const YEARS = [];
    // Update these 2 const values to update the years being displayed on the age dropdown. 
    const minAge = 16;
    const maxAge = 100;

    for (let j = 0, i = currentYear - minAge; i >= currentYear - maxAge; i--, j++) {
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
