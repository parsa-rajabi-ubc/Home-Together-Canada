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

    for (let j = 0, i = currentYear - 16; i >= currentYear - 60; i--, j++) {
        YEARS.push({
                label: i,
                value: i
            }
        )
    }
    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Select the Year You Were Born"}
                      options={YEARS}
                      onChange={onChange}/>
        </div>

    )
}

BirthYear.propTypes = {
    onChange: propTypes.func
};

export default BirthYear;
