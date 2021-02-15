/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for Area of Interest model
 *
 */

const circle = require('@turf/circle').default;

const db = require('../models');
const AreaOfInterest = db.areaOfInterest;
const { getGeographicalCoordinatesFromCity, getCircularFeatureFromCoordinates} = require('./utils/locationUtils');

const createAreaOfInterest = async (areaOfInterest, uid) => {
    const coordinates = await getGeographicalCoordinatesFromCity(areaOfInterest.province, areaOfInterest.city);

    const feature = getCircularFeatureFromCoordinates(coordinates, areaOfInterest.radius);

    const areaOfInterestEntry = {
        uid: uid,
        province: areaOfInterest.province,
        city: areaOfInterest.city,
        radius: areaOfInterest.radius,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        feature: JSON.stringify(feature)
    }

    return AreaOfInterest.create(areaOfInterestEntry);
}

const updateAreaOfInterest = (areaOfInterest, uid) => {
    return AreaOfInterest.update(
        {
            province: areaOfInterest.province,
            city: areaOfInterest.city,
            radius: areaOfInterest.radius
        },
        {
            where: { uid: uid }
        }
    );
}

const deleteAreaOfInterest = (areaOfInterest, uid) => {
    return AreaOfInterest.destroy({
        where: {
            uid: uid,
            province: areaOfInterest.province,
            city: areaOfInterest.city,
            radius: areaOfInterest.radius
        }
    });
}

const findAreasOfInterestForUser = uid => {
    return AreaOfInterest.findAll({
        where: {
            uid: uid
        }
    });
}

const findAllAreasOfInterestsForAllUsers = (req, res) => {
    AreaOfInterest.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong getting areas of interest"})
        });
}

module.exports = {
    createAreaOfInterest,
    findAllAreasOfInterestsForAllUsers,
    updateAreaOfInterest,
    deleteAreaOfInterest,
    findAreasOfInterestForUser
}
