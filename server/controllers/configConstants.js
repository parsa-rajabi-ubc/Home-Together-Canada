/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.09
 *
 * @Description: default constants used to configure controllers and data
 *
 */

// default country for all searches with respect to location
const DEFAULT_COUNTRY = 'Canada';

// default radius that is used to account for the area of a city (based off of a coordinate)
const DEFAULT_RADIUS = 20;

// default number of steps (points) used when creating a circular polygon
const DEFAULT_STEP_ACCURACY = 25;

const PROVINCE_ABBREVIATION = {
    AB: 'AB',
    BC: 'BC',
    MB: 'MB',
    NB: 'NB',
    NL: 'NL',
    NT: 'NT',
    NS: 'NS',
    NU: 'NU',
    ON: 'ON',
    PE: 'PE',
    QC: 'QC',
    SK: 'SK',
    YT: 'YT'
}

const PROVINCES_LIST = [
    PROVINCE_ABBREVIATION.AB,
    PROVINCE_ABBREVIATION.BC,
    PROVINCE_ABBREVIATION.MB,
    PROVINCE_ABBREVIATION.NB,
    PROVINCE_ABBREVIATION.NL,
    PROVINCE_ABBREVIATION.NT,
    PROVINCE_ABBREVIATION.NS,
    PROVINCE_ABBREVIATION.NU,
    PROVINCE_ABBREVIATION.ON,
    PROVINCE_ABBREVIATION.PE,
    PROVINCE_ABBREVIATION.QC,
    PROVINCE_ABBREVIATION.SK,
    PROVINCE_ABBREVIATION.YT
];

const PROVINCE_MAP = new Map([
    [PROVINCE_ABBREVIATION.AB, 'Alberta'],
    [PROVINCE_ABBREVIATION.BC, 'British Columbia'],
    [PROVINCE_ABBREVIATION.MB, 'Manitoba'],
    [PROVINCE_ABBREVIATION.NB, 'New Brunswick'],
    [PROVINCE_ABBREVIATION.NL, 'Newfoundland and Labrador'],
    [PROVINCE_ABBREVIATION.NT, 'Northwest Territories'],
    [PROVINCE_ABBREVIATION.NS, 'Nova Scotia'],
    [PROVINCE_ABBREVIATION.NU, 'Nunavut'],
    [PROVINCE_ABBREVIATION.ON, 'Ontario'],
    [PROVINCE_ABBREVIATION.PE, 'Prince Edward Island'],
    [PROVINCE_ABBREVIATION.QC, 'Quebec'],
    [PROVINCE_ABBREVIATION.SK, 'Saskatchewan'],
    [PROVINCE_ABBREVIATION.YT, 'Yukon'],
]);

module.exports = {
    PROVINCE_ABBREVIATION,
    PROVINCES_LIST,
    DEFAULT_COUNTRY,
    DEFAULT_RADIUS,
    DEFAULT_STEP_ACCURACY,
    PROVINCE_MAP
}
