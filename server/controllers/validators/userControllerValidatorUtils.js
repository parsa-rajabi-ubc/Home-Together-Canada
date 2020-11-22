/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: custom validators to validate input to controller functions to create business and member users
 *
 */

const abstractUserController = require('../abstractUserController');

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

module.exports = {
    PROVINCES,
    isValidPhoneNumber,
    isValidCanadianPostalCode,
    shouldMailingAddressBeDefined,
    shouldMapAddressBeDefined,
    shouldIncorporatedOwnersNamesBeDefined,
    usernameShouldNotAlreadyExist,
    emailShouldNotAlreadyBeInUse,
    usernameShouldExist
}