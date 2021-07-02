/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Utility file for functions evaluating strings
 *
 */

export function isStringEmpty(str){
    //is string blank, empty, null, undefined, whitespace
    if (typeof str === 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str))
        return true;
    else if (typeof str === 'string' && str.replace(/\s/g,"") === "") {
        return true;
    }
    else
        return false;
}

export function isStringEmail(str) {
    //regular expression - impossible to know if real email unless you actually try to send, but regex checks for structure
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i;
    //ensure email is not case sensitive
    return regex.test(String(str).toLowerCase());
}

export function isStringNumeralsOnly(str) {
    //is string all numerals - no decimals
    return /^\d+$/.test(str);
}

export function isStringSame(str1, str2) {
    //is string 1 equal to string 2
    //considers whitespace relevant - for passwords
    //doesn't accept empty/null/undefined/whitespace strings
    if(!isStringEmpty(str1) && !isStringEmpty(str2)){
        if(str1 === str2)
        {
            return true;
        }
    }
    return false;
}
