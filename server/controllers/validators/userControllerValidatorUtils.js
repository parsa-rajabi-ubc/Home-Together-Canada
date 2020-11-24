/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: custom validators to validate input to controller functions to create business and member users
 *
 */

const abstractUserController = require('../abstractUserController');
const memberAccountController = require('../memberAccountController');

const PROVINCES = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon'
];

const GENDERS = [
    'Female',
    'Male',
    'Other'
];

const STATUSES = [
    'Single',
    'Couple',
    'Couple With Children',
    'Single Parent',
    'Existing Group'
];

const SHARE_LIMITS = [1, 2, 3, 4, -1];  // -1 means any number of people

const isValidPhoneNumber = (phoneNum) => {
    if (phoneNum.toString().length !== 10) {
        throw new Error('Phone number must be 10 digits long')
    }
    else {
        return true;    // Indicates the success of this synchronous custom validator. See - https://github.com/express-validator/express-validator/issues/619
    }
};

// This regex does cover the case A1A 1A1, input must be normalized before validating
const isValidCanadianPostalCode = (postalCode) => {
    const regex = RegExp('^([A-Za-z]\\d[A-Za-z][-]?\\d[A-Za-z]\\d)');
    if (!regex.test(postalCode)) {
        throw new Error('Invalid postal code');
    } else {
        return true;
    }
};

const shouldMailingAddressBeDefined = (addressPart, req) => {
    if (req.body.hasDifferentMailingAddress && !addressPart) {
        throw new Error('Address must be defined');
    } else {
        return true;
    }
};

const shouldMapAddressBeDefined = (addressPart, req) => {
    if (!req.body.isNationWide && !addressPart) {
        throw new Error('Address must be defined');
    } else {
        return true;
    }
};

const shouldIncorporatedOwnersNamesBeDefined = (incorporatedOwnersNames, req) => {
    if (req.body.isIncorporated && !incorporatedOwnersNames) {
        throw new Error(`Incorporated owners' names must be defined`);
    } else {
        return true;
    }
};

const isPositiveInteger = (num) => {
    if (num < 0) {
        console.log('montly rent is negative');
        throw new Error('Must provide a positive value');
    } else {
        console.log('montly rent is postiive');
        return true;
    }
}

// TODO: write tests for this function
const isValidShareLimit = (limit) => SHARE_LIMITS.includes(limit);

// TODO: write tests for this function
const isValidAreasOfInterest = (areasOfInterest) => {
    if (!!areasOfInterest && areasOfInterest.length > 0) {
        areasOfInterest.forEach(areaOfInterest => {
            if (!areaOfInterest || !areaOfInterest.province || !areaOfInterest.city || !areaOfInterest.radius) {
                throw new Error('Area of interest must include province, city and radius properties');
            } else if (!PROVINCES.includes(areaOfInterest.province)) {
                throw new Error('Must provide a valid Canadian Province');
            } else if (parseInt(areaOfInterest.radius) < 0) {
                // TODO: look into if there should be a max radius
                throw new Error('Radius must be positive');
            }
        });
    } else if (!!areasOfInterest && !areasOfInterest.length) {
        throw new Error('At least one area of interest must be provided');
    }
    return true;
}

const usernameShouldNotAlreadyExist = (username) =>
    abstractUserController.findUserByUsername(username)
        .then(user => {
            if (user.length) {
                return Promise.reject('User already exists');
            }
        });

const emailShouldNotAlreadyBeInUse = (email) =>
    abstractUserController.findUserByEmail(email)
        .then(user => {
            if (user.length) {
                return Promise.reject('Email already in use');
            }
        });

const usernameShouldExist = (username) =>
    abstractUserController.findUserByUsername(username)
        .then(user => {
            if (!user.length) {
                return Promise.reject('Username does not exist');
            }
        });

const usernameShouldExistAndBeAMember = (username) => {
    return memberAccountController.findMemberAccountByUsername(username)
        .then(member => {
            if (!!member && !member.length) {
                return Promise.reject(`That member's username does not exist`);
            }
        });
}

const linkedMemberShouldHaveSameStatus = (username, req) => {
    return memberAccountController.findMemberAccountByUsername(username)
        .then(member => {
            if (!!member && member.length && member[0].dataValues.status !== req.body.status) {
                return Promise.reject(`Member and linked username must share the same status`);
            }
        });
}

module.exports = {
    PROVINCES,
    GENDERS,
    STATUSES,
    isValidPhoneNumber,
    isValidCanadianPostalCode,
    shouldMailingAddressBeDefined,
    shouldMapAddressBeDefined,
    shouldIncorporatedOwnersNamesBeDefined,
    isPositiveInteger,
    isValidShareLimit,
    isValidAreasOfInterest,
    usernameShouldNotAlreadyExist,
    emailShouldNotAlreadyBeInUse,
    usernameShouldExist,
    usernameShouldExistAndBeAMember,
    linkedMemberShouldHaveSameStatus
}