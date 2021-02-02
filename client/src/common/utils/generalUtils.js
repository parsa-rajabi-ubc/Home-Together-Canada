/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.24
 *
 * @Description: general utility functions
 *
 */

import includes from "lodash/includes";

export function resolveBooleanToYesNo(value) {
    return value ? "yes" : "no";
}

export function isValueInArray(arr, value){
    return includes(arr, value);
}

export function getMemberAge(birthYear){
    return new Date().getFullYear() - birthYear;
}

