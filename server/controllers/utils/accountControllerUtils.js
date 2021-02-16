/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: utility functions to abstract manipulation of data in accountControllers
 *
 */
// import {memberHasCoupleStatus} from "../../../client/src/accountSummary/member/memberAccountSummaryUtils";

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

/**
 *
 * @param flag: if this field is true, then the optional field can be defined
 * @param optionalField
 */
const getValueOfOptionalField = (flag, optionalField) => {
    return flag ? optionalField : null;
}

const formatPhoneNumber = (phoneNum) => {
    if (!phoneNum || phoneNum.toString().length !== 10 || typeof phoneNum !== 'number') {
        return '';
    }
    const phoneNumStr = phoneNum.toString();
    return phoneNumStr.substring(0,3) + '-' + phoneNumStr.substring(3, 6) + '-' + phoneNumStr.substring(6, 10);
}

// Takes results from a query of memberAccount and extracts profile information
const getFilteredProfilesInformation = results => {
    if (!results || !results.length) {
        return [];
    }

    return results.map(result => {
        const member = result.dataValues;
        return {
            ...getProfile(member),
            areasOfInterest: getFormattedAreasOfInterest(member.AreaOfInterests),
            roommates: getRoommateUsernamesFromMemberAccount(member.Roommates),
            username: getUsernameFromAbstractUser(member.AbstractUser)
        }
    });
}

const getFormattedAreasOfInterest = areasOfInterest => {
    return areasOfInterest.map(areaOfInterest => {
        return {
            province: areaOfInterest.dataValues.province,
            city: areaOfInterest.dataValues.city,
            radius: areaOfInterest.dataValues.radius,
        }
    });
}

const getUsernameFromAbstractUser = abstractUser => {
    return get(abstractUser, 'dataValues.username', null);
}

const getRoommateUsernamesFromMemberAccount = memberAccounts => {
    if (!memberAccounts || !memberAccounts.length) {
        return undefined;
    }
    return memberAccounts.map(member => member.dataValues.AbstractUser.dataValues.username);
}

const getProfile = member => {
    return {
        uid: member.uid,
        gender: member.gender,
        genderDescription: member.genderDescription,
        birthYear: member.birthYear,
        status: member.status,
        minMonthlyBudget: member.minMonthlyBudget,
        maxMonthlyBudget: member.maxMonthlyBudget,
        numRoommates: member.numRoommates,
        workStatus: member.workStatus,
        bio: member.bio,
        hasHomeToShare: member.hasHomeToShare,
        homeToShareDescription: member.homeToShareDescription,
        isReligionImportant: member.isReligionImportant,
        religionDescription: member.religionDescription,
        isDietImportant: member.isDietImportant,
        dietDescription: member.dietDescription,
        hasHealthMobilityIssues: member.hasHealthMobilityIssues,
        healthMobilityIssuesDescription: member.healthMobilityIssuesDescription,
        hasAllergies: member.hasAllergies,
        allergiesDescription: member.allergiesDescription,
        hasPets: member.hasPets,
        petsDescription: member.petsDescription,
        isSmoker: member.isSmoker,
        smokingDescription: member.smokingDescription,
        isInterestedInBuyingHome: member.isInterestedInBuyingHome,
        interestInBuyingHomeDescription: member.interestInBuyingHomeDescription
    }
}

const getMemberAccountInfo = member => {
    return {
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phoneNumber: member.phoneNumber,
        addressLine1: member.addressLine1,
        addressLine2: member.addressLine2,
        city: member.city,
        province: member.province,
        postalCode: member.postalCode,
        hasDifferentMailingAddress: member.hasDifferentMailingAddress,
        mailingAddressLine1: member.mailingAddressLine1,
        mailingAddressLine2: member.mailingAddressLine2,
        mailingCity: member.mailingCity,
        mailingProvince: member.mailingProvince,
        mailingPostalCode: member.mailingPostalCode
    }
}

module.exports = {
    getMailingAddress,
    getValueOfOptionalField,
    formatPhoneNumber,
    getFilteredProfilesInformation,
    getMemberAccountInfo,
    getProfile
}
