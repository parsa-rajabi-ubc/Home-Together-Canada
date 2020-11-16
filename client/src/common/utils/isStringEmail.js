/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation Component to see if textarea input has an email structure.
 *
 */

function isStringEmail(str) {
    //regular expression - impossible to know if real email unless you actually try to send, but regex checks for structure
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i;
    //ensure email is not case sensitive
    return regex.test(String(str).toLowerCase());
}
export default isStringEmail