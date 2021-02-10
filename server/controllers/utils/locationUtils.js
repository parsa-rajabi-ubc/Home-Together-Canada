/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.20
 *
 * @Description: utility with functions for locations
 *
 */
// TODO: move this file to a more common location

const nodeGeocoder = require("node-geocoder");
const circle = require('@turf/circle').default;
const booleanOverlap = require('@turf/boolean-overlap').default;
const booleanWithin = require('@turf/boolean-within').default;

const { DEFAULT_COUNTRY, DEFAULT_RADIUS, DEFAULT_STEP_ACCURACY } = require('../configConstants');

const geoCoder = nodeGeocoder({
    provider: 'openstreetmap'
});

const isCanadianPostalCode = (postalCode) => {
    const regex = RegExp('^([A-Za-z]\\d[A-Za-z][-]?\\d[A-Za-z]\\d)');
    return regex.test(postalCode);
}

const getGeographicalCoordinates = async (province, city) => {
    const location = `${city} ${province} ${DEFAULT_COUNTRY}`;
    const locations = await geoCoder.geocode(location);
    return {
        latitude: locations[0].latitude,
        longitude: locations[0].longitude
    };
}

const getCircularFeatureFromCoordinates = (coordinates, radius) =>
    circle(
        [coordinates.latitude, coordinates.longitude],
        DEFAULT_RADIUS + radius,
        {steps: DEFAULT_STEP_ACCURACY}
    );

const getCircularFeatureFromLocation = async (province, city, radius) => {
        const coordinates = await getGeographicalCoordinates(province, city);
        return getCircularFeatureFromCoordinates(coordinates, radius);
}

const featuresOverlap = (feature1, feature2) => {
    return booleanWithin(feature1, feature2)
        || booleanWithin(feature2, feature1)
        || booleanOverlap(feature1, feature2);
}

module.exports = {
    isCanadianPostalCode,
    getGeographicalCoordinates,
    getCircularFeatureFromCoordinates,
    getCircularFeatureFromLocation,
    featuresOverlap
}