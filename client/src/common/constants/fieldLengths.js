export const DEFAULT_STRING_LENGTH = 255;

export const USER_FIELD_LENGTHS = {
    USERNAME: 50,
    PASSWORD: DEFAULT_STRING_LENGTH,
    EMAIL: DEFAULT_STRING_LENGTH,
    FIRST_NAME: 100,
    LAST_NAME: 100,
    PHONE_NUMBER: 12,
    ADDRESS_LINE_1: 100,
    ADDRESS_LINE_2: 100,
    CITY: 60,
    PROVINCE: 2,
    POSTAL_CODE: 6,
    MAILING_ADDRESS_LINE_1: 100,
    MAILING_ADDRESS_LINE_2: 100,
    MAILING_CITY: 60,
    MAILING_PROVINCE: 2,
    MAILING_POSTAL_CODE: 6
};

export const MEMBER_FIELD_LENGTHS = {
    GENDER: 50,
    GENDER_DESCRIPTION: 100,
    STATUS: DEFAULT_STRING_LENGTH,
    HAS_HOME_TO_SHARE_DESCRIPTION: 100,
    INTERESTED_IN_BUYING_HOME_DESCRIPTION: 100,
    RELIGION_DESCRIPTION: 100,
    DIET_DESCRIPTION: 100,
    HEALTH_MOBILITY_DESCRIPTION: 100,
    ALLERGIES_DESCRIPTION: 100,
    PETS_DESCRIPTION: 100,
    SMOKING_DESCRIPTION: 100,
    BIO: 2000,
    WORK_STATUS: DEFAULT_STRING_LENGTH,
    DEACTIVATION_REASON: 500
};

export const BUSINESS_FIELD_LENGTHS = {
    BUSINESS_NAME: 100,
    INCORPORATED_OWNERS_NAMES: DEFAULT_STRING_LENGTH,
    MAP_ADDRESS_LINE_1: 100,
    MAP_ADDRESS_LINE_2: 100,
    MAP_CITY: 60,
    MAP_PROVINCE: 2,
    MAP_POSTAL_CODE: 6,
    WEBSITE: DEFAULT_STRING_LENGTH
}

export const LISTING_FIELD_LENGTHS = {
    TITLE: 75,
    SHORT_DESCRIPTION: DEFAULT_STRING_LENGTH,
    FULL_DESCRIPTION: 2000,
    CONTACT_NAME: 200,
    RATES_AND_FEES: DEFAULT_STRING_LENGTH,
    ADDRESS_LINE_1: 100,
    ADDRESS_LINE_2: 100,
    CITY: 60,
    PROVINCE: 2,
    POSTAL_CODE: 6,
    EVENT_DATE_TIME: DEFAULT_STRING_LENGTH,
    ORDER_ID: DEFAULT_STRING_LENGTH
}

export const MESSAGE_FIELD_LENGTHS = {
    SENDER_USERNAME: 50,
    RECEIVER_USERNAME: 50,
    CONTENT: 2000
}
