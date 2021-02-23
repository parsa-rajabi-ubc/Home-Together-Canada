/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.22
 *
 * @Description: controller functions for the listing subcategory model
 *
 */
const db = require('../models');
const MemberListingLocation = db.memberListingLocation;

const addMemberListingLocation = (latitude, longitude, id) => {
    return MemberListingLocation.create({ latitude, longitude, ListingId: id });
}

const findAllMemberListingLocationEntries = (req, res) => {
    MemberListingLocation.findAll()
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(200).json({ err: err.message });
        })
}

module.exports = {
    addMemberListingLocation,
    findAllMemberListingLocationEntries
}
