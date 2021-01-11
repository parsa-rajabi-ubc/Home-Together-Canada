/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.19
 *
 * @Description: utility with helper functions for registration process
 *
 */
import {isStringEmpty} from "../common/utils/stringUtils";
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
