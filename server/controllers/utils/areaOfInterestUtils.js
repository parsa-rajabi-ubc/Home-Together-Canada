/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.29
 *
 * @Description: utility functions for areas of interest
 *
 */

const differenceWith = require('lodash/differenceWith');
const isEqual = require('lodash/isEqual');

const getListOfAreaOfInterestObjects = areasOfInterest => {
    if (!areasOfInterest)
        return [];

    return areasOfInterest.map(areaOfInterest => {
        return {
            province: areaOfInterest.province,
            city: areaOfInterest.city,
            radius: areaOfInterest.radius
        }
    });
}

const areasOfInterestHaveChanged = (oldAreasOfInterest, newAreasOfInterest) => {
    return !!differenceWith(oldAreasOfInterest, newAreasOfInterest, isEqual).length
        || !!differenceWith(newAreasOfInterest, oldAreasOfInterest, isEqual).length;
}

module.exports = {
    getListOfAreaOfInterestObjects,
    areasOfInterestHaveChanged
}
