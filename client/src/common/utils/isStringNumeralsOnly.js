/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation Component to see if textarea has strictly numeral input.
 *
 */

function isStringNumeralsOnly(str) {
    //is string all numerals - no decimals
    return /^\d+$/.test(str);
}

export default isStringNumeralsOnly