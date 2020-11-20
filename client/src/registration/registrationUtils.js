/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: Show all the years that allowed users to select:
 *
 */

const currentYear = new Date().getFullYear();
const YEARS = [];

for (let j = 0, i = currentYear-16; i >= currentYear - 96; i--,j++) {
    YEARS.push({
        id : j,
        value : i}
    )
}
export default YEARS

/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.19
 *
 * @Description: utility with helper functions for registration process
 *
 */
import {isStringEmpty} from "../common/utils/stringUtils";

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