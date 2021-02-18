/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: custom validators to validate input to controller functions to create business and member users
 *
 */
const isNumber = require('lodash/isNumber');
const nodeGeocoder = require("node-geocoder");

const abstractUserController = require('../abstractUserController');
const memberAccountController = require('../memberAccountController');
const PasswordService = require('../../services/PasswordService');
const {isCanadianPostalCode} = require('../utils/locationUtils');
const {STATUS} = require('../../constants/memberConstants');
const { DEFAULT_COUNTRY, PROVINCE_MAP, PROVINCES_LIST } = require('../configConstants');

const geoCoder = nodeGeocoder({
    provider: 'openstreetmap'
});

const GENDERS = [
    'Female',
    'Male',
    'Other'
];

const STATUSES = [
    STATUS.SINGLE,
    STATUS.COUPLE,
    STATUS.COUPLE_WITH_CHILDREN,
    STATUS.SINGLE_PARENT,
    STATUS.EXISTING_GROUP
];

const SHARE_LIMITS = [1, 2, 3, 4, -1];  // -1 means any number of people

const WORK_STATUSES = [
    'Unemployed',
    'Student',
    'Part-time',
    'Full-time',
    'Self-employed',
    'Retired',
    'Semi-retired',
    'Other'
];

const DEACTIVATION_REASONS = [
    'Have found people to share with, am not able to find people',
    'Will be away for a while',
    'Have changed my mind. I do not want to share',
    'Other'
];

const MAX_RADIUS = 500;

const isValidPassword = password => {
    const numbersRegex = /\d+/;         // checks for numbers
    const lowerCaseRegex = /[a-z]/;     // checks for lowercase letters
    const upperCaseRegex = /[A-Z]/;     // checks for uppercase letters

    if (!numbersRegex.test(password) || !lowerCaseRegex.test(password) || !upperCaseRegex.test(password)
        || password.length < 8) {
            throw new Error('Password must contain 8 characters, and at least one number, lower and upper case letter');
    }
    return true;
}

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

const validateMailingPostalCode = (postalCode, req) => {
    if (req.body.hasDifferentMailingAddress && !isCanadianPostalCode(postalCode)) {
        throw new Error('A valid postal code for the mailing address must be provided');
    } else {
        return true;
    }
}

const validateMailingProvince = (province, req) => {
    if (req.body.hasDifferentMailingAddress) {
        if (!PROVINCES_LIST.includes(province)) {
            throw new Error('Mailing province is incorrect');
        } else {
            return true;
        }
    } else {
        return true;
    }
}

const shouldMapAddressBeDefined = (addressPart, req) => {
    if (!req.body.isNationWide && !addressPart) {
        throw new Error('Address must be defined');
    } else {
        return true;
    }
};

const validateMapPostalCode = (postalCode, req) => {
    if (!req.body.isNationWide && !isCanadianPostalCode(postalCode)) {
        throw new Error('A valid postal code for the searchable address must be provided');
    } else {
        return true;
    }
}

const validateMapProvince = (province, req) => {
    if (!req.body.isNationWide) {
        if (!PROVINCES_LIST.includes(province)) {
            throw new Error('Searchable address province is incorrect');
        } else {
            return true;
        }
    } else {
        return true;
    }
}

const validMapAddress = (addressLine1, req) => {
    const address = `${addressLine1} ${req.body.mapCity} ${req.body.mapProvince}`;
    return geoCoder.geocode(address)
        .then(locations => {
            if (!locations.length) {
                return Promise.reject('Invalid map address');
            }
        });
}

const shouldIncorporatedOwnersNamesBeDefined = (incorporatedOwnersNames, req) => {
    if (req.body.isIncorporated && !incorporatedOwnersNames) {
        throw new Error(`Incorporated owners' names must be defined`);
    } else {
        return true;
    }
};

const isPositiveInteger = (num) => {
    if (num === undefined || num === null || num < 0) {
        throw new Error('Must provide a positive value');
    } else {
        return true;
    }
}

const validateMinAndMax = (min, max) => {
    if (!isNumber(min) || !isNumber(max) || min > max) {
        throw new Error('Min is greater than the max');
    } else {
        return true;
    }
}

const validStatusPreferences = (statuses) => {
    if (!statuses || !statuses.length) {
        throw new Error('Status list is empty');
    } else {
        statuses.forEach(status => {
            if (!STATUSES.includes(status)) {
                throw new Error('Status is not included valid statuses');
            }
        });
    }
    return true;
}

const validGenderPreferences = (genders) => {
    if (!genders || !genders.length) {
        throw new Error('Gender preferences list is empty');
    } else {
        genders.forEach(gender => {
            if (!GENDERS.includes(gender)) {
                throw new Error('Gender is not included in valid genders');
            }
        });
    }
    return true;
}

const isValidShareLimit = (limit) => SHARE_LIMITS.includes(limit);

const isValidShareLimitArray = limits => {
    if (!!limits.find(limit => limit === -1) && limits.length !== 1) {
        throw new Error('Share limits cannot include "Any number of people" and other values');
    }
    return true;
}

const isValidRadius = radius => {
    if (parseInt(radius) < 0 || parseInt(radius) > MAX_RADIUS) {
        throw new Error('Error must be positive and less than 500 km');
    }
    return true;
}

const isValidAreasOfInterestList = (areasOfInterest) => {
    if (!!areasOfInterest && areasOfInterest.length > 0) {
        areasOfInterest.forEach(areaOfInterest => {
            if (!areaOfInterest || !areaOfInterest.province || !areaOfInterest.city || !isNumber(areaOfInterest.radius)) {
                throw new Error('Area of interest must include province, city and radius properties');
            } else if (!PROVINCES_LIST.includes(areaOfInterest.province)) {
                throw new Error('Must provide a valid Canadian Province');
            } else if (parseInt(areaOfInterest.radius) < 0 || parseInt(areaOfInterest.radius) > MAX_RADIUS) {
                throw new Error('Radius must be positive and less than 500 km');
            }
        });
    } else if (!areasOfInterest || (!!areasOfInterest && !areasOfInterest.length)) {
        throw new Error('At least one area of interest must be provided');
    }
    return true;
}

const isValidLocation = area => {
    if (!PROVINCES_LIST.includes(area.province)) {
        throw new Error('Invalid location provided');
    }
    return geoCoder.geocode({
        country: DEFAULT_COUNTRY,
        state: PROVINCE_MAP.get(area.province),
        city: area.city
    })
        .then(results => {
            if (!results || !results.length) {
                return Promise.reject('Invalid location provided');
            }
        });
}

const usernameShouldNotAlreadyExist = (username) =>
    abstractUserController.findUserByUsername(username)
        .then(user => {
            if (user) {
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

const updatedEmailShouldNotAlreadyBeInUse = (email, req) => {
    return abstractUserController.findUserByEmail(email)
        .then(user => {
            if (user.length && user[0].dataValues.uid !== req.user.uid) {
                return Promise.reject('Email already in use');
            }
        });
}

const usernameShouldExist = (username) =>
    abstractUserController.findUserByUsername(username)
        .then(user => {
            if (!user) {
                return Promise.reject('Username does not exist');
            }
        });

const usernameShouldExistAndBeAMember = (username) => {
    return memberAccountController.findMemberAccountByUsername(username)
        .then(member => {
            if (!member) {
                return Promise.reject(`That member's username does not exist`);
            }
        });
}

const linkedMemberShouldHaveSameStatus = (username, req) => {
    return memberAccountController.findMemberAccountByUsername(username)
        .then(member => {
            if (!member || member.dataValues.status !== req.body.status) {
                return Promise.reject(`Member and linked username must share the same status`);
            }
        });
}

const providedPasswordShouldMatchExistingPassword = (password, uid) => {
    return abstractUserController.findAbstractUser(uid)
        .then(userObject => {
            if (!userObject) {
                return Promise.reject('User cannot be found');
            } else {
                const user = userObject.dataValues;
                const hashedPassword = PasswordService.getHashedPassword(password, user.salt);

                if (hashedPassword !== user.password) {
                    return Promise.reject(`Old password is incorrect`);
                }
            }
        });
}

const providedNewPasswordShouldNotMatchExistingPassword = (password, uid) => {
    return abstractUserController.findAbstractUser(uid)
        .then(userObject => {
            if (!userObject) {
                return Promise.reject('User cannot be found');
            } else {
                const user = userObject.dataValues;
                const hashedPassword = PasswordService.getHashedPassword(password, user.salt);

                if (hashedPassword === user.password) {
                    return Promise.reject('New password cannot be the same as previous password');
                }
            }
        });
}
const correctPasswordForUsername = (username, password) =>
    abstractUserController.findUserByUsername(username)
        .then(user => {
            if (user) {
                const hashedPassword = PasswordService.getHashedPassword(password, user.salt);

                if (hashedPassword !== user.password) {
                    return Promise.reject('Incorrect password');
                }
            } else {
                return Promise.reject('Incorrect username');
            }
    });

module.exports = {
    PROVINCES_LIST,
    PROVINCE_MAP,
    GENDERS,
    STATUSES,
    WORK_STATUSES,
    SHARE_LIMITS,
    DEACTIVATION_REASONS,
    isValidPassword,
    isValidPhoneNumber,
    isValidCanadianPostalCode,
    shouldMailingAddressBeDefined,
    validateMailingPostalCode,
    validateMailingProvince,
    shouldMapAddressBeDefined,
    validateMapPostalCode,
    validateMapProvince,
    validMapAddress,
    shouldIncorporatedOwnersNamesBeDefined,
    isPositiveInteger,
    validateMinAndMax,
    validStatusPreferences,
    validGenderPreferences,
    isValidShareLimit,
    isValidShareLimitArray,
    isValidRadius,
    isValidAreasOfInterestList,
    isValidLocation,
    usernameShouldNotAlreadyExist,
    emailShouldNotAlreadyBeInUse,
    updatedEmailShouldNotAlreadyBeInUse,
    usernameShouldExist,
    usernameShouldExistAndBeAMember,
    linkedMemberShouldHaveSameStatus,
    providedPasswordShouldMatchExistingPassword,
    providedNewPasswordShouldNotMatchExistingPassword,
    correctPasswordForUsername
}
