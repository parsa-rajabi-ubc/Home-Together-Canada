/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Year component for member regi.
 *
 */

import React, { useState } from 'react';
import Dropdown from "./Dropdown";

function BirthYear() {
    const [yearOfBirth,setYearOfBirth] = useState("");

    const currentYear = new Date().getFullYear();
    const handleYearChange = e => {
        setYearOfBirth(e.value);
    }
    const YEARS = [];

    for (let j = 0, i = currentYear-16; i >= currentYear - 60; i--,j++) {
        YEARS.push({
            label : i,
            value : j}
        )
    }
    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Year of Birth"}
                    options={YEARS}
                    onChange={handleYearChange}/>
        </div>
    )
}
export default BirthYear;