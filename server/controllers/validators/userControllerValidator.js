/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: functions to validate input to controller functions to create business and member users
 *
 */

const { body } = require('express-validator/check');

const {
    PROVINCES_LIST,
    GENDERS,
    STATUSES,
    WORK_STATUSES,
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
    isValidShareLimit,
    isValidShareLimitArray,
    validStatusPreferences,
    validGenderPreferences,
    isValidBirthYear,
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
    correctPasswordForUsername,
    isValidStringLength,
    isOptionalFieldAValidStringLength
} = require('./userControllerValidatorUtils');
const { removeAllWhiteSpace } = require('../utils/stringUtils');
const {
    ABSTRACT_USER_FIELD_LENGTHS,
    MEMBER_FIELD_LENGTHS,
    BUSINESS_FIELD_LENGTHS
} = require('../../constants/fieldLengthsConstants')

const registrationSigninDetailsValidation = [
    body('username', 'A username must be provided')
        .exists()
        .isString()
        .withMessage('Username must be a string')
        .trim()
        .stripLow()
        .custom(username => isValidStringLength(
            username,
            ABSTRACT_USER_FIELD_LENGTHS.USERNAME,
            'Username'
        ))
        .custom((username) => usernameShouldNotAlreadyExist(username)),
    body('password', "A password must be provided")
        .exists()
        .isString()
        .withMessage('Password must be a string')
        .trim()
        .stripLow()
        .custom(password => isValidStringLength(
            password,
            ABSTRACT_USER_FIELD_LENGTHS.PASSWORD,
            'Password'
        ))
        .custom(password => isValidPassword(password)),
];

const emailUponUpdateValidation = [
    body('email', 'A valid email must be provided')
        .exists()
        .trim()
        .stripLow()
        .isEmail()
        .isString()
        .withMessage('Email must be a string')
        .custom(email => isValidStringLength(email, ABSTRACT_USER_FIELD_LENGTHS.EMAIL, 'Email'))
        .custom((email, { req })=> updatedEmailShouldNotAlreadyBeInUse(email, req))
];

const emailUponRegistrationValidation = [
    body('email', "A valid email must be provided")
        .exists()
        .isString()
        .withMessage('Email must be a string')
        .trim()
        .stripLow()
        .isEmail()
        .custom(email => isValidStringLength(email, ABSTRACT_USER_FIELD_LENGTHS.EMAIL, 'Email'))
        .custom((email) => emailShouldNotAlreadyBeInUse(email))
];

const abstractUserValidation = [
    body('firstName', 'A valid first name must be provided')
        .exists()
        .isString()
        .withMessage('First name must be a string')
        .trim()
        .stripLow()
        .not().isEmpty()
        .custom(firstName => isValidStringLength(
            firstName,
            ABSTRACT_USER_FIELD_LENGTHS.FIRST_NAME,
            'First name'
        )),
    body('lastName', 'A valid last name must be provided')
        .exists()
        .isString()
        .withMessage('Last name must be a string')
        .trim()
        .stripLow()
        .not().isEmpty()
        .custom(lastName => isValidStringLength(
            lastName,
            ABSTRACT_USER_FIELD_LENGTHS.LAST_NAME,
            'Last name'
        )),
    body('phoneNumber')
        .exists()
        .isNumeric()
        .custom(phoneNum => isValidPhoneNumber(phoneNum)),
    body('addressLine1', 'A valid address line 1 must be provided')
        .exists()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Address Line 1 must be a string')
        .not().isEmpty()
        .custom(addressLine1 => isValidStringLength(
            addressLine1,
            ABSTRACT_USER_FIELD_LENGTHS.ADDRESS_LINE_1,
            'Address Line 1'
        )),
    body('addressLine2', 'Address line 2 is invalid')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Address Line 2 must be a string')
        .custom(addressLine2 => isValidStringLength(
            addressLine2,
            ABSTRACT_USER_FIELD_LENGTHS.ADDRESS_LINE_2,
            'Address Line 2')),
    body('city', 'A valid city must be provided')
        .exists()
        .trim()
        .stripLow()
        .isString()
        .withMessage('City must be a string')
        .not().isEmpty()
        .custom(city => isValidStringLength(city, ABSTRACT_USER_FIELD_LENGTHS.CITY, 'City')),
    body('province', 'A valid province must be provided')
        .exists()
        .isIn(PROVINCES_LIST)
        .isString()
        .withMessage('Province must be a string')
        .custom(province => isValidStringLength(
            province,
            ABSTRACT_USER_FIELD_LENGTHS.PROVINCE,
            'Province'
        )),
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
        .trim()
        .stripLow()
        .custom((mailingAddressLine1, { req }, fieldName) => shouldMailingAddressBeDefined(
            mailingAddressLine1,
            req,
            fieldName
        ))
        .custom((mailingAddressLine1, { req }) => isOptionalFieldAValidStringLength(
            req.body.hasDifferentMailingAddress,
            mailingAddressLine1,
            ABSTRACT_USER_FIELD_LENGTHS.MAILING_ADDRESS_LINE_1,
            'Mailing Address Line 1'
        )),
    body('mailingAddressLine2')
        .trim()
        .stripLow()
        .custom((mailingAddressLine2, { req }) => isOptionalFieldAValidStringLength(
            (req.body.hasDifferentMailingAddress && !!mailingAddressLine2),
            mailingAddressLine2,
            ABSTRACT_USER_FIELD_LENGTHS.MAILING_ADDRESS_LINE_2,
            'Mailing Address Line 2'
        )),
    body('mailingCity')
        .trim()
        .stripLow()
        .custom((mailingCity, { req }) => isOptionalFieldAValidStringLength(
            req.body.hasDifferentMailingAddress,
            mailingCity,
            ABSTRACT_USER_FIELD_LENGTHS.MAILING_CITY,
            'Mailing City'
        ))
        .custom((mailingCity, { req }) => shouldMailingAddressBeDefined(mailingCity, req)),
    body('mailingProvince')
        .custom((mailingProvince, {req}) => validateMailingProvince(mailingProvince, req))
        .custom((mailingProvince, { req }) => isOptionalFieldAValidStringLength(
            req.body.hasDifferentMailingAddress,
            mailingProvince,
            ABSTRACT_USER_FIELD_LENGTHS.MAILING_PROVINCE,
            'Mailing Province')),
    body('mailingPostalCode', 'Mailing postal code must be defined if hasDifferentMailingAddress is true')
        .trim()
        .stripLow()
        .customSanitizer(postalCode => removeAllWhiteSpace(postalCode))
        .custom((postalCode, { req }) => validateMailingPostalCode(postalCode, req)),
];

const businessAccountValidation = [
    body('businessName', 'A valid business name is required')
        .exists()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Business name must be a string')
        .not().isEmpty()
        .custom(businessName => isValidStringLength(
            businessName,
            BUSINESS_FIELD_LENGTHS.BUSINESS_NAME,
            'Business name'
        )),
    body('isIncorporated', 'isIncorporated must be specified')
        .exists()
        .isBoolean(),
    body('incorporatedOwnersNames')
        .custom((incorporatedOwnersNames, { req }) => shouldIncorporatedOwnersNamesBeDefined(
            incorporatedOwnersNames,
            req
        ))
        .custom((incorporatedOwnersNames, { req }) => isOptionalFieldAValidStringLength(
            req.body.isIncorporated,
            incorporatedOwnersNames,
            BUSINESS_FIELD_LENGTHS.INCORPORATED_OWNERS_NAMES,
            `Incorporated owners' names`
        )),
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
        .trim()
        .stripLow()
        .custom((mapAddressLine1, { req }) => shouldMapAddressBeDefined(mapAddressLine1, req))
        .custom((mapAddressLine1, { req }) => validMapAddress(mapAddressLine1, req))
        .custom((mapAddressLine1, { req }) => isOptionalFieldAValidStringLength(
            !req.body.isNationWide,
            mapAddressLine1,
            BUSINESS_FIELD_LENGTHS.MAP_ADDRESS_LINE_1,
            'Searchable Address Line 1')),
    body('mapAddressLine2')
        .optional()
        .trim()
        .stripLow()
        .custom((mapAddressLine2, { req }) => isOptionalFieldAValidStringLength(
            !req.body.isNationWide && !!mapAddressLine2,
            mapAddressLine2,
            BUSINESS_FIELD_LENGTHS.MAP_ADDRESS_LINE_2,
            'Searchable Address Line 2')),
    body('mapCity')
        .trim()
        .stripLow()
        .custom((mapCity, { req }) => shouldMapAddressBeDefined(mapCity, req))
        .custom((mapCity, { req }) => isOptionalFieldAValidStringLength(
            !req.body.isNationWide,
            mapCity,
            BUSINESS_FIELD_LENGTHS.MAP_CITY,
            'Searchable Address City')),
    body('mapProvince')
        .custom((mapProvince, { req }) => validateMapProvince(mapProvince, req))
        .custom((mapProvince, { req }) => isOptionalFieldAValidStringLength(
            !req.body.isNationWide,
            mapProvince,
            BUSINESS_FIELD_LENGTHS.MAP_PROVINCE,
            'Searchable Address Province')),
    body('mapPostalCode')
        .trim()
        .stripLow()
        .customSanitizer(postalCode => removeAllWhiteSpace(postalCode))
        .custom((mapPostalCode, { req }) => validateMapPostalCode(mapPostalCode, req))
        .custom((mapPostalCode, { req }) => isOptionalFieldAValidStringLength(
            !req.body.isNationWide,
            mapPostalCode,
            BUSINESS_FIELD_LENGTHS.MAP_POSTAL_CODE,
            'Searchable Address Postal Code')),
    body('website', 'Invalid website')
        .optional()
        .isURL()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Website must be a string')
        .custom(website => isValidStringLength(website, BUSINESS_FIELD_LENGTHS.WEBSITE, 'Website'))
];

const memberProfileBasicFieldsValidation = [
    body('gender', 'One of Female, Male, Other must be provided as gender')
        .exists()
        .trim()
        .stripLow()
        .isIn(GENDERS)
        .isString()
        .withMessage('Gender must be a string')
        .custom(gender => isValidStringLength(gender, MEMBER_FIELD_LENGTHS.GENDER, 'Gender')),
    body('genderDescription')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Gender description must be a string')
        .custom(genderDescription => isValidStringLength(
            genderDescription,
            MEMBER_FIELD_LENGTHS.GENDER_DESCRIPTION,
            'Gender description'
        )),
    body('birthYear', 'A valid integer must be provided as year of birth')
        .exists()
        .isNumeric()
        .custom(birthyear => isValidBirthYear(birthyear)),
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
        .custom((rent, {req}) => validateMinAndMax(req.body.minMonthlyBudget, rent)),
    body('hasHomeToShare', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('hasHomeToShareDescription', 'Invalid house description')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Home to share description must be a string')
        .custom(hasHomeToShareDescription => isValidStringLength(
            hasHomeToShareDescription,
            MEMBER_FIELD_LENGTHS.HAS_HOME_TO_SHARE_DESCRIPTION,
            'Home to Share Description'
        )),
    body('isReligionImportant', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('religionDescription', 'Invalid description for religion')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Importance of religion description must be a string')
        .custom(religionDescription => isValidStringLength(
            religionDescription,
            MEMBER_FIELD_LENGTHS.RELIGION_DESCRIPTION,
            'Importance of religion description'
        )),
    body('isDietImportant', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('dietDescription', 'Invalid description for diet')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Diet description must be a string')
        .custom(dietDescription => isValidStringLength(
            dietDescription,
            MEMBER_FIELD_LENGTHS.DIET_DESCRIPTION,
            'Diet description'
        )),
    body('hasHealthMobilityIssues', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('healthMobilityIssuesDescription', 'Invalid description for health and mobility')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Health and mobility issues description must be a string')
        .custom(healthMobilityIssuesDescription => isValidStringLength(
            healthMobilityIssuesDescription,
            MEMBER_FIELD_LENGTHS.HEALTH_MOBILITY_DESCRIPTION,
            'Health and mobility issues description'
        )),
    body('hasAllergies', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('allergiesDescription', 'Invalid description for allergies')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Allergies description must be a string')
        .custom(allergiesDescription => isValidStringLength(
            allergiesDescription,
            MEMBER_FIELD_LENGTHS.ALLERGIES_DESCRIPTION,
            'Allergies description'
        )),
    body('hasPets', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('petsDescription', 'Invalid description for pets description')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Pets description must be a string')
        .custom(petsDescription => isValidStringLength(
            petsDescription,
            MEMBER_FIELD_LENGTHS.PETS_DESCRIPTION,
            'Pets description'
        )),
    body('isSmoker', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('smokingDescription', 'Invalid description for smoking')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Smoking description must be a string')
        .custom(smokingDescription => isValidStringLength(
            smokingDescription,
            MEMBER_FIELD_LENGTHS.SMOKING_DESCRIPTION,
            'Smoking description'
        )),
    body('isInterestedInBuyingHome', 'A boolean value must be provided')
        .exists()
        .trim()
        .stripLow()
        .isBoolean(),
    body('interestInBuyingHomeDescription', 'Invalid description for interest in buying home')
        .optional()
        .trim()
        .stripLow()
        .isString()
        .withMessage('Interested in buying home description must be a string')
        .custom(interestInBuyingHomeDescription => isValidStringLength(
            interestInBuyingHomeDescription,
            MEMBER_FIELD_LENGTHS.INTERESTED_IN_BUYING_HOME_DESCRIPTION,
            "Interested in buying home description"
        )),
    body('numRoommates', 'Must provide a valid value for numRoommates')
        .exists()
        .isNumeric()
        .custom(limit => isValidShareLimit(limit)),
    body('bio', 'Must provide a valid bio')
        .optional()
        .trim()
        .stripLow(true)
        .isString()
        .withMessage('Bio must be a string')
        .custom(bio => isValidStringLength(bio, MEMBER_FIELD_LENGTHS.BIO, 'Bio')),
    body('workStatus')
        .exists()
        .trim()
        .stripLow()
        .isIn(WORK_STATUSES)
        .isString()
        .withMessage('Work status must be a string')
        .custom(workStatus => isValidStringLength(workStatus, MEMBER_FIELD_LENGTHS.WORK_STATUS))
];

const memberSearchFiltersValidation = [
    body('minAgePreference')
        .exists()
        .isNumeric()
        .custom(age => isPositiveInteger(age)),
    body('maxAgePreference')
        .exists()
        .isNumeric()
        .custom(age => isPositiveInteger(age))
        .custom((age, { req }) => validateMinAndMax(req.body.minAgePreference, age)),
    body('minBudgetPreference')
        .exists()
        .isNumeric()
        .custom(budget => isPositiveInteger(budget)),
    body('maxBudgetPreference')
        .exists()
        .isNumeric()
        .custom(budget => isPositiveInteger(budget))
        .custom((budget, {req}) => validateMinAndMax(req.body.minBudgetPreference, budget)),
    body('statusPreference')
        .exists()
        .isArray()
        .custom(statusPreference => validStatusPreferences(statusPreference)),
    body('numRoommatesPreference')
        .exists()
        .isArray()
        .custom(limits => isValidShareLimitArray(limits)),
    body('numRoommatesPreference.*')
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
    body('genderPreference')
        .exists()
        .isArray()
        .custom(genderPreferences => validGenderPreferences(genderPreferences)),
    body('religionPreference')
        .exists()
        .isBoolean(),
    body('othersWithHomeToSharePreference')
        .exists()
        .isBoolean()
]

const memberStatusValidation = [
    body('status', 'A valid status must be provided')
        .exists()
        .trim()
        .stripLow()
        .isIn(STATUSES)
        .isString()
        .withMessage('Status must be a string')
        .custom(status => isValidStringLength(status, MEMBER_FIELD_LENGTHS.STATUS, 'Status')),
    body('partnerUsername', `A valid member's username must be provided for partners`)
        .optional()
        .trim()
        .stripLow()
        .custom(partnerUsername => usernameShouldExistAndBeAMember(partnerUsername))
        .custom((partnerUsername, { req }) =>
            linkedMemberShouldHaveSameStatus(partnerUsername, req)),
    body('existingGroupUsernames')
        .optional()
        .isArray(),
    // * allows us to test each username in array with custom function
    body('existingGroupUsernames.*')
        .optional()
        .trim()
        .stripLow()
        .custom(username => usernameShouldExistAndBeAMember(username))
        .custom((username, { req }) => linkedMemberShouldHaveSameStatus(username, req)),
];

const areasOfInterestValidation = [
    body('areasOfInterest')
        .exists()
        .isArray()
        .custom(areasOfInterest => isValidAreasOfInterestList(areasOfInterest)),
    body('areasOfInterest.*', 'Invalid location provided for area of interest')
        .custom(areaOfInterest => isValidLocation(areaOfInterest))
];


exports.validate = (method) => {
    switch (method) {
        case 'createBusinessUser': {
            return [
                ...abstractUserValidation,
                ...registrationSigninDetailsValidation,
                ...emailUponRegistrationValidation,
                ...businessAccountValidation

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
                    .custom((password, { req }) => correctPasswordForUsername(req.body.username, password))
            ]
        }
        case 'createMemberUser': {
            return [
                ...abstractUserValidation,
                ...registrationSigninDetailsValidation,
                ...emailUponRegistrationValidation,
                ...memberProfileBasicFieldsValidation,
                ...memberStatusValidation,
                ...areasOfInterestValidation,
                ...memberSearchFiltersValidation
            ]
        }
        case 'changePassword': {
            return [
                // old password must match the current password
                body('oldPassword')
                    .exists()
                    .trim()
                    .stripLow()
                    .custom((oldPassword, {req}) => providedPasswordShouldMatchExistingPassword(oldPassword, req.user.uid)),
                // new password should not match the current password
                body('newPassword')
                    .exists()
                    .trim()
                    .stripLow()
                    .custom((newPassword, {req}) => providedNewPasswordShouldNotMatchExistingPassword(newPassword, req.user.uid))
                    .custom(newPassword => isValidPassword(newPassword))
                    .custom(newPassword => isValidStringLength(
                        newPassword,
                        ABSTRACT_USER_FIELD_LENGTHS.PASSWORD,
                        'New password'
                    ))
            ]
        }
        case 'updateBusinessInfo': {
            return [
                ...emailUponUpdateValidation,
                ...abstractUserValidation,
                ...businessAccountValidation
            ]
        }
        case 'updateMemberAccountInfo': {
            return [
                ...emailUponUpdateValidation,
                ...abstractUserValidation
            ]
        }
        case 'updateMemberProfile': {
            return [
                ...memberProfileBasicFieldsValidation
            ]
        }
        case 'updateMemberStatus' : {
            return [
                ...memberStatusValidation
            ]
        }
        case 'updateMemberAreasOfInterest':
            return [
                ...areasOfInterestValidation
            ]
        case 'updateMemberSearchFilters':
            return [
                ...memberSearchFiltersValidation
            ];

        case 'memberSearchRequest': {
            return [
                body('minAgePreference')
                    .optional()
                    .isNumeric()
                    .custom(age => isPositiveInteger(age)),
                body('maxAgePreference')
                    .optional()
                    .isNumeric()
                    .custom(age => isPositiveInteger(age))
                    .custom((age, { req }) => validateMinAndMax(req.body.minAgePreference, age)),
                body('minBudgetPreference')
                    .optional()
                    .isNumeric()
                    .custom(budget => isPositiveInteger(budget)),
                body('maxBudgetPreference')
                    .optional()
                    .isNumeric()
                    .custom(budget => isPositiveInteger(budget))
                    .custom((budget, {req}) => validateMinAndMax(req.body.minBudgetPreference, budget)),
                body('statusPreference')
                    .optional()
                    .isArray()
                    .custom(statusPreference => validStatusPreferences(statusPreference)),
                body('numRoommatesPreference')
                    .optional()
                    .isArray()
                    .custom(limits => isValidShareLimitArray(limits)),
                body('numRoommatesPreference.*')
                    .optional()
                    .isNumeric()
                    .custom(limit => isValidShareLimit(limit)),
                body('dietPreference')
                    .optional()
                    .isBoolean(),
                body('petsPreference')
                    .optional()
                    .isBoolean(),
                body('smokingPreference')
                    .optional()
                    .isBoolean(),
                body('genderPreference')
                    .optional()
                    .isArray()
                    .custom(genderPreferences => validGenderPreferences(genderPreferences)),
                body('religionPreference')
                    .optional()
                    .isBoolean(),
                body('othersWithHomeToSharePreference')
                    .optional()
                    .isBoolean(),
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
        case 'deactivateMemberAccount': {
            return [
                body('reason', 'A valid deactivation reason must be provided')
                    .exists()
                    .isString()
                    .withMessage('Account deactivation reason must be a string')
                    .isIn(DEACTIVATION_REASONS)
                    .custom(reason => isValidStringLength(
                        reason,
                        MEMBER_FIELD_LENGTHS.DEACTIVATION_REASON,
                        'Deactivation reason'
                    ))
            ];
        }
        case 'searchMemberByUsername': {
            return [
                body('username')
                    .exists()
                    .trim()
                    .stripLow()
                    .custom(username => usernameShouldExist(username))
            ]
        }
        case 'grantAdminPrivileges': {
            return [
                body('username')
                    .exists()
                    .trim()
                    .stripLow()
                    .custom(username => usernameShouldExistAndBeAMember(username))
            ]
        }
        case 'banUser': {
            return [
                body('username')
                    .exists()
                    .trim()
                    .stripLow()
                    .custom(username => usernameShouldExist(username))
            ]
        }
    }
}
