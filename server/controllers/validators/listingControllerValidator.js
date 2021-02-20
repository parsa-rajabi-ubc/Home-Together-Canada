/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.19
 *
 * @Description: functions to validate input to controller functions to create listings
 *
 */

const {isPositiveInteger} = require("./userControllerValidatorUtils");
const {isValidPhoneNumber} = require("./userControllerValidatorUtils");
const {isValidCanadianPostalCode} = require("./userControllerValidatorUtils");
const {removeAllWhiteSpace} = require("../utils/stringUtils");
const { body } = require('express-validator/check');

const {
    LISTING_VALIDATION_METHODS,
    LISTING_TYPES,
    isValidListingTypeForUser,
    isValidCategoryForUser,
    isValidCategoryForListingType,
    isValidSubcategoryForSelectedCategory,
    listingShouldHaveCategories,
    LISTING_FIELDS_ERRORS,
} = require('./listingControllerValidatorUtils');

const commonListingInfo = [
    body('title', LISTING_FIELDS_ERRORS.TITLE)
        .exists()
        .trim()
        .stripLow()
        .not().isEmpty(),
    body('shortDescription', LISTING_FIELDS_ERRORS.SHORT_DESCRIPTION)
        .exists()
        .trim()
        .stripLow()
        .not().isEmpty(),
    body('longDescription', LISTING_FIELDS_ERRORS.LONG_DESCRIPTION)
        .exists()
        .trim()
        .stripLow()
        .not().isEmpty()
];

const monthlyCostValidation = [
    body('monthlyCost', LISTING_FIELDS_ERRORS.MONTHLY_COST)
        .exists()
        .isNumeric()
        .customSanitizer(monthlyCost => parseInt(monthlyCost))
        .custom(monthlyCost => isPositiveInteger(monthlyCost)),
];

const numBedBathValidation = [
    body('numBedrooms', LISTING_FIELDS_ERRORS.NUM_BEDROOMS)
        .exists()
        .isNumeric()
        .custom(numBedrooms => isPositiveInteger(numBedrooms)),
    body('numBathrooms', LISTING_FIELDS_ERRORS.NUM_BATHROOMS)
        .exists()
        .isNumeric()
        .custom(numBathrooms => isPositiveInteger(numBathrooms))
]

const petFriendlyValidation = [
    body('petFriendly', LISTING_FIELDS_ERRORS.PET_FRIENDLY)
        .exists()
        .isBoolean()
];

const smokeFriendlyValidation = [
    body('smokeFriendly', LISTING_FIELDS_ERRORS.SMOKE_FRIENDLY)
        .exists()
        .isBoolean()
];

const contactNameValidation = [
    body('contactName', LISTING_FIELDS_ERRORS.CONTACT_NAME)
        .exists()
        .trim()
        .stripLow()
        .not().isEmpty()
];

const contactNumberValidation = [
    body('contactNumber', LISTING_FIELDS_ERRORS.CONTACT_PHONE_NUMBER)
        .exists()
        .isNumeric()
        .custom(contactNumber => isValidPhoneNumber(contactNumber))
];

const ratesAndFeesValidation = [
    body('ratesAndFees', LISTING_FIELDS_ERRORS.RATES_AND_FEES)
        .exists()
        .trim()
        .stripLow()
        .not().isEmpty()
];

exports.validate = method => {
    switch (method) {
        case LISTING_VALIDATION_METHODS.BASIC_LISTING_INFO: {
            return [
                body('type')
                    .exists()
                    .isIn([LISTING_TYPES.SERVICE, LISTING_TYPES.CLASSIFIED])
                    .custom((type, { req }) => isValidListingTypeForUser(type, req.user.uid)),
                body('category')
                    .exists()
                    .custom((category, { req }) => isValidCategoryForUser(category, req.user.uid))
                    .custom((category, { req }) => isValidCategoryForListingType(category, req.body.type)),
                body('subcategories')
                    .custom((subcategories, { req }) => listingShouldHaveCategories(subcategories, req.body.category)),
                body('subcategories.*')
                    .custom((subcategory, { req }) => isValidSubcategoryForSelectedCategory(subcategory, req.body.category))
            ]
        }
        case LISTING_VALIDATION_METHODS.MEMBER_HOME_FORM: {
            return [
                ...commonListingInfo,
                ...monthlyCostValidation,
                ...numBedBathValidation,
                ...petFriendlyValidation,
                ...smokeFriendlyValidation,
                body('postalCode', LISTING_FIELDS_ERRORS.POSTAL_CODE)
                    .exists()
                    .trim()
                    .stripLow()
                    .customSanitizer(postalCode => removeAllWhiteSpace(postalCode))
                    .custom(postalCode => isValidCanadianPostalCode(postalCode)),
                body('utilitiesIncluded', LISTING_FIELDS_ERRORS.UTILITIES_INCLUDED)
                    .exists()
                    .isBoolean()
            ];
        }
        case LISTING_VALIDATION_METHODS.CO_HOUSING_FORM: {
            return [
                ...commonListingInfo,
                ...contactNameValidation,
                body('unitsForSale', LISTING_FIELDS_ERRORS.UNITS_FOR_SALE)
                    .exists()
                    .isNumeric()
                    .custom(numUnits => isPositiveInteger(numUnits)),
                body('unitsForRent', LISTING_FIELDS_ERRORS.UNITS_FOR_RENT)
                    .exists()
                    .isNumeric()
                    .custom(numUnits => isPositiveInteger(numUnits)),
            ]
        }
        case LISTING_VALIDATION_METHODS.HOME_SHARE_FACILITATION_BUSINESS_FORM: {
            return [
                ...commonListingInfo,
                ...ratesAndFeesValidation
            ];
        }
        case LISTING_VALIDATION_METHODS.GOVERNMENT_SERVICES_FORM: {
            return [
                ...commonListingInfo,
                ...contactNameValidation,
                ...contactNumberValidation
            ];
        }
        case LISTING_VALIDATION_METHODS.RENTALS_FORM: {
            return [
                ...commonListingInfo,
                ...monthlyCostValidation,
                ...numBedBathValidation,
                ...petFriendlyValidation,
                ...smokeFriendlyValidation,
                body('isFurnished', LISTING_FIELDS_ERRORS.IS_FURNISHED)
                    .exists()
                    .isBoolean()
            ];
        }
        case LISTING_VALIDATION_METHODS.HOUSE_YARD_FORM: {
            return [
                ...commonListingInfo,
                ...ratesAndFeesValidation
            ];
        }
        case LISTING_VALIDATION_METHODS.LEGAL_SALES_FORM: {
            return [
                ...commonListingInfo,
                ...ratesAndFeesValidation
            ];
        }
        case LISTING_VALIDATION_METHODS.CLASSES_EVENTS_CLUBS_FORM: {
            return [
                ...commonListingInfo,
                ...ratesAndFeesValidation,
                ...contactNameValidation,
                ...contactNumberValidation,
                body('eventDateTimes')
                    .exists()
                    .trim()
                    .stripLow()
                    .not().isEmpty()
            ];
        }
    }
}
