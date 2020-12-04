/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for Area of Interest model
 *
 */

const db = require('../models');
const AreaOfInterest = db.areaOfInterest;

const createAreaOfInterest = (areaOfInterest, uid) => {

    // TODO: add geocoding to determine lat. and long. coordinates
    const areaOfInterstEntry = {
        uid: uid,
        province: areaOfInterest.province,
        city: areaOfInterest.city,
        radius: areaOfInterest.radius
    }

    return AreaOfInterest.create(areaOfInterstEntry);
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
    findAllAreasOfInterestsForAllUsers
}