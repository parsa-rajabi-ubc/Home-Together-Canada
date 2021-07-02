/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.24
 *
 * @Description: general utility functions
 *
 */

import includes from "lodash/includes";
import {isStringEmpty} from "./stringUtils";

export function resolveBooleanToYesNo(value) {
    return value ? "yes" : "no";
}

export function toggleYesNo(value) {
    return value === 'yes' ? 'no'  : 'yes';
}

export function isValueInArray(arr, value){
    return includes(arr, value);
}

export function getMemberAge(birthYear){
    return new Date().getFullYear() - birthYear;
}

export function validatePositiveNumber(number, setStateVar){
    // If number is negative or empty, it's not valid
    if (number < 0 || isStringEmpty(number)){
        // Set error true, it's NOT valid
        setStateVar(true);
        return true;
    } else {
        // Set error false, it's a valid postal code
        setStateVar(false);
        return false;
    }
}