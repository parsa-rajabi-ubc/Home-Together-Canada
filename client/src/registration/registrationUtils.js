/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.19
 *
 * @Description: utility with helper functions for registration process
 *
 */
import {isStringEmail, isStringEmpty, isStringNumeralsOnly, isStringSame} from "../common/utils/stringUtils";
import head from 'lodash/head';

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
    if (!errors || !errors.length) return errorMessage;
    errors.forEach(error => errorMessage += (error.msg + '\n'));
    return errorMessage;
}

export const getFirstErrorMessage = errors => {
    return (!errors || !errors.length) ? '' : head(errors).msg;
}

// check if string is empty, if so, set state variable to true
export function validateInput(st, setStateVar) {
    if (isStringEmpty(st)) {
        setStateVar(true);
        return true;
    } else {
        setStateVar(false);
        return false;
    }
}

// check if phone number is valid and contains all appropriate properties, if so,return true
export function isPhoneNumberValid(phoneNumber) {
    if (isStringEmpty(phoneNumber.first) || isStringEmpty(phoneNumber.middle) || isStringEmpty(phoneNumber.last)) {
        return false;
    } else if (!isStringNumeralsOnly(phoneNumber.first) || !isStringNumeralsOnly(phoneNumber.middle) || !isStringNumeralsOnly(phoneNumber.last)) {
        return false;
    } else if (!(phoneNumber.first.length === 3) || !(phoneNumber.middle.length === 3) || !(phoneNumber.last.length === 4)) {
        return false;
    } else
        return true
}

// check if phone number is valid, if not, set state variable to true
export function validatePhoneNumber(phoneNumber, setStateVar) {
    if (!isPhoneNumberValid(phoneNumber)) {
        setStateVar(true);
        return true;
    } else {
        setStateVar(false);
        return false;
    }
}

// check if email string is empty or if it is an email format, if not, set state variable to true
export function validateEmail(email, setStateVar) {
    if (isStringEmpty(email) || !isStringEmail(email)) {
        setStateVar(true);
        return true;
    } else {
        setStateVar(false);
        return false;
    }

}

// check if password and password confirmation are empty and if not, check if they're the same string, if not, set
// state variable to true
export function validatePasswordConfirmationMismatch(password, passwordConfirmation, setStateVar) {
    if (!isStringEmpty(password) && !isStringEmpty(passwordConfirmation)) {
        if (!isStringSame(password, passwordConfirmation)) {
            setStateVar("mismatch");
            return true;
        } else {
            setStateVar(false)
            return false;
        }
    }
}

// check if password confirmation is empty, if so, set state variable to "empty"
export function validatePasswordConfirmationEmpty(passwordConfirmation, setStateVar) {
    if (isStringEmpty(passwordConfirmation)) {
        setStateVar("empty");
        return true;
    } else {
        setStateVar(false);
        return false;
    }

}

// checks object for true and returns true if there is one
export function checkIfErrorsExistInMapping(obj) {
    return Object.values(obj).includes(true);
}
