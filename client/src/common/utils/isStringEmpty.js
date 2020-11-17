/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation Component to see if textarea is empty or with invalid input.
 *
 */

function isStringEmpty(str){
    //is string blank, empty, null, undefined, whitespace
    return typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "";
}

export default isStringEmpty