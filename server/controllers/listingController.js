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
const { Op } = require("sequelize");

const db = require('../models');
const Listing = db.listing;
const ListingCategory = db.listingCategory;
const MemberListingLocation = db.memberListingLocation;
const ListingSubcategory = db.listingSubcategory;
const AbstractUser = db.abstractUser;
const BusinessAccount = db.businessAccount;

const { LISTING_TYPES } = require('../controllers/validators/listingControllerValidatorUtils');
const { getListingFields } = require('./utils/listingControllerUtils');
const listingCategoryController = require('./listingCategoryController');
const listingSubcategoryController = require('./listingSubcategoryController');
const listingAssignedSubcategoryController = require('./listingAssignedSubcategoryController');
const memberController = require('./memberAccountController');
const memberListingLocationController = require('./memberListingLocationController');
const {PROVINCE_MAP, DEFAULT_COUNTRY} = require("./configConstants");
const { getGeographicalCoordinatesFromAddress, getCircularFeatureFromLocation } = require('./utils/locationUtils');

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
            const fullSearchableAddress = `${req.body.addressLine1} ${req.body.city} ${PROVINCE_MAP.get(req.body.province)} ${DEFAULT_COUNTRY}`;
            const coordinates = await getGeographicalCoordinatesFromAddress(fullSearchableAddress);
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
                where: {
                    name: categoryName
                }
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

    return filteredLocations.map(listing => {
        return {
            id: listing.id,
            uid: listing.uid,
            ...(JSON.parse(listing.fields)),
            isClassified: listing.isClassified,
            createdAt: listing.createdAt,
            updatedAt: listing.updatedAt,
            categoryName: listing.ListingCategory.name
        }
    });
}

const searchBusinessListings = async (searchArea, categoryName, subcategoryNames) => {
    const businessListings = await Listing.findAll({
        where: {
            isDeleted: false,
            // TODO:  remove equal null option when implementing admin portal
            dateAdminApproved: {
                [Op.or]: {
                    [Op.gt]: new Date(),
                    [Op.eq]: null
                }
            },
            dateExpired: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.lt]: new Date()
                }
            }
        },
        include: [
            {
                model: ListingCategory,
                where: {
                    name: categoryName,
                },
                include: [
                    {
                        model: ListingSubcategory,
                        where: {
                            name: subcategoryNames
                        }
                    }
                ]
            },
            {
                model: AbstractUser,
                attributes: ['username', 'email'],
                include: [
                    {
                        model: BusinessAccount
                    }
                ]
            }
        ]
    });

    const searchAreaFeature = await getCircularFeatureFromLocation(searchArea.province, searchArea.city, searchArea.radius);

    const businessListingsFilteredByLocation = filter(businessListings, function (listing) {
        if (listing.AbstractUser.BusinessAccount.isNationWide) {
            return true;
        }
        const pointObj = point([
            parseFloat(listing.AbstractUser.BusinessAccount.mapLongitude),
            parseFloat(listing.AbstractUser.BusinessAccount.mapLatitude)
        ]);
        const polygonObj = polygon(searchAreaFeature.geometry.coordinates);

        return booleanPointInPolygon(
            pointObj,
            polygonObj
        );
    });

    return businessListingsFilteredByLocation.map(listing => {
        return {
            id: listing.id,
            uid: listing.uid,
            ...(JSON.parse(listing.fields)),
            isClassified: listing.isClassified,
            createdAt: listing.createdAt,
            updatedAt: listing.updatedAt,
            categoryName: listing.ListingCategory.name,
            business: {
                username: listing.AbstractUser.dataValues.username,
                email: listing.AbstractUser.dataValues.email,
                ...listing.AbstractUser.BusinessAccount.dataValues,
            }
        }
    });
}

const softDeleteListings = uid => {
    return Listing.update({
        isDeleted: true
    }, {
        where: {
            uid: uid
        }
    })
}

module.exports = {
    createListing,
    findAllListings,
    searchMemberServiceListings,
    searchBusinessListings,
    softDeleteListings
}

