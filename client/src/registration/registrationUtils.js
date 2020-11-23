/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.19
 *
 * @Description: utility with helper functions for registration process
 *
 */
import React, {useState} from 'react';
import {isStringEmpty} from "../common/utils/stringUtils";
import Select from "react-select";
import LoginForm from "../login/LoginForm";

function getYears() {
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
    <Select isSearchable={true} placeholder={"Year of Birth"}
            options={YEARS} value={YEARS.find(obj => obj.label === setYearOfBirth)}
            onChange={handleYearChange}/>
    <div><b>Selected Year: </b> {yearOfBirth}</div>
        </div>
)
}
export default getYears;

export const getPhoneNumberFromStrings = (areaCode, exchangeCode, stationCode) => {
    if (!areaCode || isStringEmpty(areaCode) ||
        !exchangeCode || isStringEmpty(exchangeCode) ||
        !stationCode || isStringEmpty(stationCode)) {
        return undefined;
    } else {
        return parseInt(areaCode + exchangeCode + stationCode);
    }
}

// given an array of error objects, extract the messages of each error and concatenate into a string
export const getConcatenatedErrorMessage = (errors) => {
    let errorMessage = '';
    errors.forEach(error => errorMessage += (error.msg + '\n'));
    return errorMessage;
}