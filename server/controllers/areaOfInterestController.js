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
    const areaOfInterestEntry = {
        uid: uid,
        province: areaOfInterest.province,
        city: areaOfInterest.city,
        radius: areaOfInterest.radius
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
