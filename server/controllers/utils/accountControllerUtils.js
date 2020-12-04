/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: utility functions to abstract manipulation of data in accountControllers
 *
 */
const getMailingAddress = (body) => {
    return body.hasDifferentMailingAddress ?
        {
            mailingAddressLine1: body.mailingAddressLine1,
            mailingAddressLine2: body.mailingAddressLine2,
            mailingCity: body.mailingCity,
            mailingProvince: body.mailingProvince,
            mailingPostalCode: body.mailingPostalCode
        } :
        {
            mailingAddressLine1: body.addressLine1,
            mailingAddressLine2: body.addressLine2,
            mailingCity: body.city,
            mailingProvince: body.province,
            mailingPostalCode: body.postalCode
        }
}

const formatPhoneNumber = (phoneNum) => {
    if (!phoneNum || phoneNum.toString().length !== 10 || typeof phoneNum !== 'number') {
        return '';
    }
    const phoneNumStr = phoneNum.toString();
    return phoneNumStr.substring(0,3) + '-' + phoneNumStr.substring(3, 6) + '-' + phoneNumStr.substring(6, 10);
}

module.exports = {
    getMailingAddress,
    formatPhoneNumber
}