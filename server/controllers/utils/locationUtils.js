/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.20
 *
 * @Description: utility with functions for locations
 *
 */
// TODO: move this file to a more common location

const isCanadianPostalCode = (postalCode) => {
    const regex = RegExp('^([A-Za-z]\\d[A-Za-z][-]?\\d[A-Za-z]\\d)');
    return regex.test(postalCode);
}

module.exports = {
    isCanadianPostalCode
}