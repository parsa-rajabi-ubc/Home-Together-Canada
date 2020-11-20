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
    isValidPhoneNumber,
    isValidCanadianPostalCode,
    shouldMailingAddressBeDefined,
    shouldMapAddressBeDefined,
    shouldIncorporatedOwnersNamesBeDefined,
    usernameShouldNotAlreadyExist,
    emailShouldNotAlreadyBeInUse
} = require('./userControllerValidatorUtils');
const { removeAllWhiteSpace } = require('../utils/stringUtils');

exports.validate = (method) => {
    switch (method) {
        case 'createBusinessUser': {
            return [
                // abstract user
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
                    .custom((mailingProvince, {req}) => shouldMailingAddressBeDefined(mailingProvince, req)),    // TODO add custom validator to ensure that this is defined if hasDifferentMailingAddress is true
                body('mailingPostalCode', 'Mailing postal code must be defined if hasDifferentMailingAddress is true')
                    .optional()
                    .trim()
                    .stripLow()
                    .customSanitizer(postalCode => removeAllWhiteSpace(postalCode))
                    .custom(postalCode => isValidCanadianPostalCode(postalCode))
                    .custom((postalCode, { req }) => shouldMailingAddressBeDefined(postalCode, req)),    // TODO add custom validator to ensure that this is defined if hasDifferentMailingAddress is true

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
                    .isNumeric()
                    .custom(phoneNum => isValidPhoneNumber(phoneNum)),
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

    }
}