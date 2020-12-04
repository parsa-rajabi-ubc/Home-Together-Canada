/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: utility with functions for common string manipulation
 *
 */
// TODO: move this file to a more common location

const removeAllWhiteSpace = (str) => {
    if (!str) {
        return str;
    }
    return str.replace(/\s/g, '');
}

module.exports = {
    removeAllWhiteSpace
}