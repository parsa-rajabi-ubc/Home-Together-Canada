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
const point = require('@turf/helpers').point;
const booleanOverlap = require('@turf/boolean-overlap').default;
const booleanWithin = require('@turf/boolean-within').default;

const { DEFAULT_COUNTRY, DEFAULT_RADIUS, DEFAULT_STEP_ACCURACY, PROVINCE_MAP } = require('../configConstants');

const geoCoder = nodeGeocoder({
    provider: 'openstreetmap'
});

const isCanadianPostalCode = (postalCode) => {
    const regex = RegExp('^([A-Za-z]\\d[A-Za-z][-]?\\d[A-Za-z]\\d)');
    return regex.test(postalCode);
}

const getGeographicalCoordinatesFromCity = async (province, city) => {
    const locations = await geoCoder.geocode({
        country: DEFAULT_COUNTRY,
        state: PROVINCE_MAP.get(province),
        city: city
    });
    return {
        latitude: locations[0].latitude,
        longitude: locations[0].longitude
    };
}

const getGeographicalCoordinatesFromAddress = async (address) => {
    const locations = await geoCoder.geocode(address);
    return {
        latitude: locations[0].latitude,
        longitude: locations[0].longitude
    }
}

const getCircularFeatureFromCoordinates = (coordinates, radius) =>
    circle(
        point([coordinates.longitude, coordinates.latitude]),
        DEFAULT_RADIUS + radius,
        {steps: DEFAULT_STEP_ACCURACY}
    );

const getCircularFeatureFromLocation = async (province, city, radius) => {
        const coordinates = await getGeographicalCoordinatesFromCity(province, city);
        return getCircularFeatureFromCoordinates(coordinates, radius);
}

const featuresOverlap = (feature1, feature2) => {
    return booleanWithin(feature1, feature2)
        || booleanWithin(feature2, feature1)
        || booleanOverlap(feature1, feature2);
}

module.exports = {
    isCanadianPostalCode,
    getGeographicalCoordinatesFromCity,
    getGeographicalCoordinatesFromAddress,
    getCircularFeatureFromCoordinates,
    getCircularFeatureFromLocation,
    featuresOverlap
}