/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.20
 *
 * @Description: controller functions for the listing model
 *
 */
const filter = require('lodash/filter');
const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default;
const point = require('@turf/helpers').point;
const polygon = require('@turf/helpers').polygon;

const db = require('../models');
const Listing = db.listing;
const ListingCategory = db.listingCategory;
const MemberListingLocation = db.memberListingLocation;

const { LISTING_TYPES } = require('../controllers/validators/listingControllerValidatorUtils');
const { getListingFields } = require('./utils/listingControllerUtils');
const listingCategoryController = require('./listingCategoryController');
const listingSubcategoryController = require('./listingSubcategoryController');
const listingAssignedSubcategoryController = require('./listingAssignedSubcategoryController');
const memberController = require('./memberAccountController');
const memberListingLocationController = require('./memberListingLocationController');
const { getGeographicalCoordinatesFromPostalCode, getCircularFeatureFromLocation } = require('./utils/locationUtils');

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

        if (await memberController.findMemberAccountByUid(req.user.uid)) {
            const coordinates = await getGeographicalCoordinatesFromPostalCode(req.body.postalCode);
            await memberListingLocationController.addMemberListingLocation(
                parseFloat(coordinates.latitude),
                parseFloat(coordinates.longitude),
                listing.id
            );
        }

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

const searchMemberServiceListings = async (searchArea, categoryName) => {
    const memberServiceListings = await Listing.findAll({
        include: [
            {
                model: ListingCategory,
            },
            {
                model: MemberListingLocation
            }
        ]
    });

    const searchAreaFeature = await getCircularFeatureFromLocation(searchArea.province, searchArea.city, searchArea.radius);

    const filteredLocations = filter(memberServiceListings, function (memberServiceListing) {
        const pointObj = point([
            parseFloat(memberServiceListing.MemberListingLocation.longitude),
            parseFloat(memberServiceListing.MemberListingLocation.latitude)
        ]);
        const polygonObj = polygon(searchAreaFeature.geometry.coordinates);

        return booleanPointInPolygon(
            pointObj,
            polygonObj
        );
    });

    return filteredLocations;
}

module.exports = {
    createListing,
    findAllListings,
    searchMemberServiceListings
}

