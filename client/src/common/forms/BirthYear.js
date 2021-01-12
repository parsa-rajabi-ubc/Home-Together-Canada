/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Year component for member registration.
 *
 */

import React, {useState} from 'react';
import Dropdown from "./Dropdown";
import propTypes from "prop-types";

function BirthYear(props) {
    const {givenYear, onChange, dropdownCSS} = props;
    const [intialSelection, setIntialSelection] = useState({label: givenYear, value: givenYear});
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
                      onChange={onChange}
                      intialSelection={intialSelection}
                      dropdownCSS={dropdownCSS}
            />
        </div>

    )
}

BirthYear.propTypes = {
    givenYear: propTypes.number,
    onChange: propTypes.func,
    dropdownCSS: propTypes.object
};

export default BirthYear;
