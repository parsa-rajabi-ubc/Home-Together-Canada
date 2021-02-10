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

module.exports = {
    DEFAULT_COUNTRY,
    DEFAULT_RADIUS,
    DEFAULT_STEP_ACCURACY
}
