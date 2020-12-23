/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: functions to validate input to controller functions to create business and member users
 *
 */

const { body } = require('express-validator/check');

const {
    PROVINCES,
    GENDERS,
    STATUSES,
    isValidPhoneNumber,
    isValidCanadianPostalCode,
    shouldMailingAddressBeDefined,
    shouldMapAddressBeDefined,
    shouldIncorporatedOwnersNamesBeDefined,
    isPositiveInteger,
    validateMinAndMax,
    isValidShareLimit,
    validStatusPreferences,
    isValidAreasOfInterest,
    usernameShouldNotAlreadyExist,
    emailShouldNotAlreadyBeInUse,
    usernameShouldExist,
    usernameShouldExistAndBeAMember,
    linkedMemberShouldHaveSameStatus
} = require('./userControllerValidatorUtils');
const { removeAllWhiteSpace } = require('../utils/stringUtils');

const abstractUserValidation = [
    body('username')
        .exists()
        .trim()
        .stripLow()
        .custom((username) => usernameShouldNotAlreadyExist(username)),
    body('password', "A password must be provided")
        .exists()
        .trim()
        .stripLow(),
    body('email', "A valid email must be provided")
        .exists()
        .isEmail()
        .trim()
        .stripLow()
        .custom((email) => emailShouldNotAlreadyBeInUse(email)),
    body('firstName', 'A valid first name must be provided')
        .exists()
        .trim()
        .stripLow(),
    body('lastName', 'A valid last name must be provided')
        .exists()
        .trim()
        .stripLow(),
    body('phoneNumber')
        .exists()
        .isNumeric()
        .custom(phoneNum => isValidPhoneNumber(phoneNum)),
    body('addressLine1', 'A valid address line 1 must be provided')
        .exists()
        .trim()
        .stripLow(),
    body('addressLine2', 'Address line 2 is invalid')
        .optional()
        .trim()
        .stripLow(),
    body('city', 'A valid city must be provided')
        .exists()
        .trim()
        .stripLow(),
    body('province', 'A valid province must be provided')
        .exists()
        .isIn(PROVINCES),
    body('postalCode', 'A valid postal code must be provided')
        .exists()
        .trim()
        .stripLow()
        .customSanitizer(postalCode => removeAllWhiteSpace(postalCode))
        .custom(postalCode => isValidCanadianPostalCode(postalCode)),
    body('hasDifferentMailingAddress', 'Must select if the same mailing address is to be used')
        .exists()
        .isBoolean(),
    body('mailingAddressLine1')
        .optional()
        .trim()
        .stripLow()
        .custom((mailingAddressLine1, { req }) => shouldMailingAddressBeDefined(mailingAddressLine1, req)),
    body('mailingAddressLine2', 'Mailing address line 2 must be defined if hasDifferentMailingAddress is true')
        .optional()
        .trim()
        .stripLow(),
    body('mailingCity')
        .optional()
        .trim()
        .stripLow()
        .custom((mailingCity, { req }) => shouldMailingAddressBeDefined(mailingCity, req)),
    body('mailingProvince')
        .optional()
        .trim()
        .stripLow()
        .isIn(PROVINCES)
        .custom((mailingProvince, {req}) => shouldMailingAddressBeDefined(mailingProvince, req)),
    body('mailingPostalCode', 'Mailing postal code must be defined if hasDifferentMailingAddress is true')
        .optional()
        .trim()
        .stripLow()
        .customSanitizer(postalCode => removeAllWhiteSpace(postalCode))
        .custom(postalCode => isValidCanadianPostalCode(postalCode))
        .custom((postalCode, { req }) => shouldMailingAddressBeDefined(postalCode, req)),
];


exports.validate = (method) => {
    switch (method) {
        case 'createBusinessUser': {
            return [
                ...abstractUserValidation,

                // business account
                body('businessName', 'A valid business name is required')
                    .exists()
                    .trim()
                    .stripLow(),
                body('logo', 'A valid server address must be provided')
                    .optional()
                    .trim()
                    .stripLow(),   // TODO: this will probably have to change depending on how we upload logos
                body('isIncorporated', 'isIncorporated must be specified')
                    .exists()
                    .isBoolean(),
                body('incorporatedOwnersNames')
                    .optional()
                    .custom((incorporatedOwnersNames, { req }) => shouldIncorporatedOwnersNamesBeDefined(incorporatedOwnersNames, req)),     // TODO: add a custom validator here
                body('businessPhoneNumber')
                    .exists()
                    .custom(phoneNum => isValidPhoneNumber(phoneNum))
                    .isNumeric(),
                body('businessCellPhoneNumber')
                    .exists()
                    .isNumeric()
                    .custom(phoneNum => isValidPhoneNumber(phoneNum)),
                body('isNationWide', 'A boolean value for isNationWide')
                    .exists()
                    .isBoolean(),
                body('mapAddressLine1')
                    .optional()
                    .trim()
                    .stripLow()
                    .custom((mapAddressLine1, { req }) => shouldMapAddressBeDefined(mapAddressLine1, req)),
                body('mapAddressLine2')
                    .optional()
                    .trim()
                    .stripLow(),
                body('mapCity')
                    .optional()
                    .trim()
                    .stripLow()
                    .custom((mapCity, { req }) => shouldMapAddressBeDefined(mapCity, req)),
                body('mapProvince')
                    .optional()
                    .isIn(PROVINCES)
                    .custom((mapProvince, { req }) => shouldMapAddressBeDefined(mapProvince, req)),
                body('mapPostalCode')
                    .optional()
                    .trim()
                    .stripLow()
                    .customSanitizer(postalCode => removeAllWhiteSpace(postalCode))
                    .custom(mapPostalCode => isValidCanadianPostalCode(mapPostalCode))
                    .custom((mapPostalCode, { req }) => shouldMapAddressBeDefined(mapPostalCode, req)),
                body('website', 'Invalid website')
                    .optional()
                    .isURL()
                    .trim()
                    .stripLow()
            ]
        }
        case 'loginUser': {
            return [
                body('username')
                    .exists()
                    .trim()
                    .stripLow()
                    .custom(username => usernameShouldExist(username)),
                body('password', 'A password must be provided')
                    .exists()
                    .trim()
                    .stripLow()
            ]
        }
        case 'createMemberUser': {
            return [
                ...abstractUserValidation,

                // member account and profile
                body('gender', 'One of Female, Male, Other must be provided as gender')
                    .exists()
                    .trim()
                    .stripLow()
                    .isIn(GENDERS),
                body('genderDescription')
                    .optional()
                    .trim()
                    .stripLow(),
                body('birthYear', 'A valid integer must be provided as year of birth')
                    .exists()
                    .isNumeric(),
                body('status', 'A valid status must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isIn(STATUSES),
                body('minMonthlyBudget', 'A valid positive integer must be provided for rent')
                    .exists()
                    .isNumeric()
                    .customSanitizer(rent => parseInt(rent))
                    .custom(rent => isPositiveInteger(rent)),
                body('maxMonthlyBudget', 'A valid positive integer must be provided for rent')
                    .exists()
                    .isNumeric()
                    .customSanitizer(rent => parseInt(rent))
                    .custom(rent => isPositiveInteger(rent))
                    .custom((rent, {req}) => validateMinAndMax(req.minMonthlyBudget, rent)),
                body('hasHomeToShare', 'A boolean value must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isBoolean(),
                body('hasHomeToShareDescription', 'Invalid house description')
                    .optional()
                    .trim()
                    .stripLow(true),
                body('isReligionImportant', 'A boolean value must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isBoolean(),
                body('religionDescription', 'Invalid description for religion')
                    .optional()
                    .trim()
                    .stripLow(),
                body('isDietImportant', 'A boolean value must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isBoolean(),
                body('dietDescription', 'Invalid description for diet')
                    .optional()
                    .trim()
                    .stripLow(),
                body('hasHealthMobilityIssues', 'A boolean value must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isBoolean(),
                body('healthMobilityIssuesDescription', 'Invalid description for health and mobility')
                    .optional()
                    .trim()
                    .stripLow(),
                body('hasAllergies', 'A boolean value must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isBoolean(),
                body('allergiesDescription', 'Invalid description for allergies')
                    .optional()
                    .trim()
                    .stripLow(),
                body('hasPets', 'A boolean value must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isBoolean(),
                body('petsDescription', 'Invalid description for allergies')
                    .optional()
                    .trim()
                    .stripLow(),
                body('isSmoker', 'A boolean value must be provided')
                    .exists()
                    .trim()
                    .stripLow()
                    .isBoolean(),
                body('smokingDescription', 'Invalid description for allergies')
                    .optional()
                    .trim()
                    .stripLow(),
                body('numRoommates', 'Must provide a valid value for numRoommates')
                    .exists()
                    .isNumeric()
                    .custom(limit => isValidShareLimit(limit)),
                body('bio', 'Must provide a valid bio')
                    .optional()
                    .trim()
                    .stripLow(true),
                body('partnerUsername', `A valid member's username must be provided for partners`)
                    .optional()
                    .trim()
                    .stripLow()
                    .custom(partnerUsername => usernameShouldExistAndBeAMember(partnerUsername))
                    .custom((partnerUsername, { req }) => linkedMemberShouldHaveSameStatus(partnerUsername, req)),
                body('existingGroupUsernames')
                    .optional()
                    .isArray(),
                body('existingGroupUsernames.*')
                    .optional()
                    .trim()
                    .stripLow()
                    .custom(username => usernameShouldExistAndBeAMember(username))
                    .custom((username, { req }) => linkedMemberShouldHaveSameStatus(username, req)),
                body('areasOfInterest')
                    .exists()
                    .isArray()
                    .custom(areasOfInterest => isValidAreasOfInterest(areasOfInterest)),
                body('minAgePreference')
                    .exists()
                    .isNumeric()
                    .custom(age => isPositiveInteger(age)),
                body('maxAgePreference')
                    .exists()
                    .isNumeric()
                    .custom(age => isPositiveInteger(age))
                    .custom((age, { req }) => validateMinAndMax(req.minAgePreference, age)),
                body('statusPreference')
                    .exists()
                    .isArray()
                    .custom(statusPreference => validStatusPreferences(statusPreference)),
                body('minNumRoommatesPreference')
                    .exists()
                    .isNumeric()
                    .custom(limit => isValidShareLimit(limit)),
                body('maxNumRoommatesPreference')
                    .exists()
                    .isNumeric()
                    .custom(limit => isValidShareLimit(limit)),
                body('dietPreference')
                    .exists()
                    .isBoolean(),
                body('petsPreference')
                    .exists()
                    .isBoolean(),
                body('smokingPreference')
                    .exists()
                    .isBoolean(),
                body('healthAndMobilityPreference')
                    .exists()
                    .isBoolean()
            ]
        }
    }
}
