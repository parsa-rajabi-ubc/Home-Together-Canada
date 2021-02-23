/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.19
 *
 * @Description: functions to validate input to controller functions to create listings
 *
 */
const { body } = require('express-validator/check');
const {isValidRadius} = require("./userControllerValidatorUtils");
const {PROVINCES_LIST} = require("../configConstants");
const {isValidLocation} = require("./userControllerValidatorUtils");

const {isPositiveInteger} = require("./userControllerValidatorUtils");
const {isValidPhoneNumber} = require("./userControllerValidatorUtils");
const {isValidCanadianPostalCode} = require("./userControllerValidatorUtils");
const {removeAllWhiteSpace} = require("../utils/stringUtils");

const {
    LISTING_VALIDATION_METHODS,
    LISTING_TYPES,
    isValidListingTypeForUser,
    isValidCategoryForUser,
    isValidCategoryForListingType,
    isValidSubcategoryForSelectedCategory,
    listingShouldHaveCategories,
    shouldOrderIdBeDefined,
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
    body('fullDescription', LISTING_FIELDS_ERRORS.FULL_DESCRIPTION)
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
    body('numBed', LISTING_FIELDS_ERRORS.NUM_BEDROOMS)
        .exists()
        .isNumeric()
        .custom(numBed => isPositiveInteger(numBed)),
    body('numBath', LISTING_FIELDS_ERRORS.NUM_BATHROOMS)
        .exists()
        .isNumeric()
        .custom(numBath => isPositiveInteger(numBath))
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
    body('contactPhoneNumber', LISTING_FIELDS_ERRORS.CONTACT_PHONE_NUMBER)
        .exists()
        .isNumeric()
        .custom(contactPhoneNumber => isValidPhoneNumber(contactPhoneNumber))
];

const ratesAndFeesValidation = [
    body('rateAndFees', LISTING_FIELDS_ERRORS.RATES_AND_FEES)
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
                    .custom((subcategory, { req }) => isValidSubcategoryForSelectedCategory(subcategory, req.body.category)),
                body('orderId')
                    .custom((orderId, { req }) => shouldOrderIdBeDefined(orderId, req.body.type))
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
                body('furnished', LISTING_FIELDS_ERRORS.IS_FURNISHED)
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
                body('eventDateTime')
                    .exists()
                    .trim()
                    .stripLow()
                    .not().isEmpty()
            ];
        }
        case LISTING_VALIDATION_METHODS.SEARCH_LISTINGS: {
            return [
                body('type')
                    .exists()
                    .isIn([LISTING_TYPES.SERVICE, LISTING_TYPES.CLASSIFIED]),
                body('category')
                    .exists()
                    .custom((category, { req }) => isValidCategoryForListingType(category, req.body.type)),
                body('subcategories')
                    .custom((subcategories, { req }) => listingShouldHaveCategories(subcategories, req.body.category)),
                body('subcategories.*')
                    .custom((subcategory, { req }) => isValidSubcategoryForSelectedCategory(subcategory, req.body.category)),
                body('searchArea.province', 'Invalid province in search area')
                    .exists()
                    .isIn(PROVINCES_LIST),
                body('searchArea.city', 'Invalid city in search area')
                    .exists()
                    .trim()
                    .stripLow(),
                body('searchArea.radius', 'Invalid radius in search area')
                    .exists()
                    .isNumeric()
                    .custom(radius => isValidRadius(radius)),
                body('searchArea', 'Invalid location for search area')
                    .exists()
                    .custom(searchArea => isValidLocation(searchArea))
            ]
        }
    }
}
