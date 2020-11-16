/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation Component to see if two textarea strings are equal.
 *
 */

function isStringSame(str1, str2) {
    //is string 1 equal to string 2
    //considers whitespace relevant - for passwords
    if(str1 === str2)
    {
        return true;
    }else{
        return false;
    }
}

export default isStringSame