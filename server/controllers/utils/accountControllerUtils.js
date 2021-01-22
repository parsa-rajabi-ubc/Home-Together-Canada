/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: utility functions to abstract manipulation of data in accountControllers
 *
 */
const get = require('lodash/get');

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
// Takes results from a query of memberAccount and extracts profile information
const getProfileInformation = results => {
    if (!results || !results.length) {
        return [];
    }

    return results.map(result => {
        const values = result.dataValues;
        return {
            uid: values.uid,
            username: getUsernameFromAbstractUser(values.AbstractUser),
            gender: values.gender,
            genderDescription: values.genderDescription,
            birthYear: values.birthYear,
            status: values.status,
            minMonthlyBudget: values.minMonthlyBudget,
            maxMonthlyBudget: values.maxMonthlyBudget,
            numRoommates: values.numRoommates,
            workStatus: values.workStatus,
            bio: values.bio,
            hasHomeToShare: values.hasHomeToShare,
            hasHomeToShareDescription: values.hasHomeToShareDescription,
            isReligionImportant: values.isReligionImportant,
            religionDescription: values.religionDescription,
            isDietImportant: values.isDietImportant,
            dietDescription: values.dietDescription,
            hasHealthMobilityIssues: values.hasHealthMobilityIssues,
            healthMobilityIssuesDescription: values.healthMobilityIssuesDescription,
            hasAllergies: values.hasAllergies,
            allergiesDescription: values.allergiesDescription,
            hasPets: values.hasPets,
            petsDescription: values.petsDescription,
            isSmoker: values.isSmoker,
            smokingDescription: values.smokingDescription
        }
    });
}

const getUsernameFromAbstractUser = abstractUser => {
    return get(abstractUser, 'dataValues.username', null);
}

module.exports = {
    getMailingAddress,
    formatPhoneNumber,
    getProfileInformation
}