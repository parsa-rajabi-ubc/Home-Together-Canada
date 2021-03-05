/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.21
 *
 * @Description: controller functions for the the listingAssignedSubcategory model
 *
 */

const db = require('../models');
const ListingAssignedSubcategory = db.listingAssignedSubcategory;

const addListingAssignedSubcategoryEntry = (listingId, subcategoryId) => {
    return ListingAssignedSubcategory.create({
        ListingSubcategoryId: subcategoryId,
        ListingId: listingId
    });
}

const findAllEntries = (req, res) => {
    ListingAssignedSubcategory.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

module.exports = {
    addListingAssignedSubcategoryEntry,
    findAllEntries
}
