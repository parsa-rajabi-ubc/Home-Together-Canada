/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.20
 *
 * @Description: controller functions for the listing model
 *
 */

const db = require('../models');
const Listing = db.listing;

const { LISTING_TYPES } = require('../controllers/validators/listingControllerValidatorUtils');
const { getListingFields } = require('./utils/listingControllerUtils');
const listingCategoryController = require('./listingCategoryController');
const listingSubcategoryController = require('./listingSubcategoryController');
const listingAssignedSubcategoryController = require('./listingAssignedSubcategoryController');

const createListing = async (req, res) => {
    try {
        const category = await listingCategoryController.findCategoryIdByName(req.body.category);

        const listingData = {
            uid: req.user.uid,
            isClassified: req.body.type === LISTING_TYPES.CLASSIFIED,
            ...(req.body.type === LISTING_TYPES.CLASSIFIED && { orderId: req.body.orderId }),
            fields: JSON.stringify(getListingFields(req)),
            ListingCategoryId: category.id
        };

        const listing = await Listing.create(listingData);

        const subcategories = await listingSubcategoryController.findListingSubcategoryIds(req.body.subcategories, category.id);

        subcategories.forEach(subcategory => {
            listingAssignedSubcategoryController.addListingAssignedSubcategoryEntry(listing.id, subcategory.id);
        });

        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
}

const findAllListings = (req, res) => {
    Listing.findAll()
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
    createListing,
    findAllListings
}

