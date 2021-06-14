/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.20
 *
 * @Description: controller functions for the listing model
 *
 */
const filter = require('lodash/filter');
const includes = require('lodash/includes');
const difference = require('lodash/difference');
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

const { getListingFields, getListingImages, formatMemberListing } = require('./utils/listingControllerUtils');
const listingCategoryController = require('./listingCategoryController');
const listingSubcategoryController = require('./listingSubcategoryController');
const memberController = require('./memberAccountController');
const memberListingLocationController = require('./memberListingLocationController');
const {PROVINCE_MAP, DEFAULT_COUNTRY} = require("./configConstants");
const { getGeographicalCoordinatesFromAddress, getCircularFeatureFromLocation } = require('./utils/locationUtils');
const {
    LISTING_TYPES,
    MEMBER_SERVICE_CATEGORIES,
    BUSINESS_LISTING_CATEGORIES
} = require('../constants/listingConstants');

const createListing = async (req, res) => {
    try {
        const category = await listingCategoryController.findCategoryIdByName(req.body.category);

        const listingData = {
            uid: req.user.uid,
            isClassified: req.body.type === LISTING_TYPES.CLASSIFIED,
            ...(req.body.type === LISTING_TYPES.CLASSIFIED && { orderId: req.body.orderId }),
            fields: JSON.stringify(getListingFields(req, req.body.category)),
            ListingCategoryId: category.id,
            ...(includes(Object.values(MEMBER_SERVICE_CATEGORIES), req.body.category) && { dateAdminApproved: Date.now() })
        };

        const listing = await Listing.create(listingData);

        const subcategories = await listingSubcategoryController.findListingSubcategoryIds(req.body.subcategories, category.id);

        await listing.addListingSubcategories(subcategories);

        if (await memberController.findMemberAccountByUid(req.user.uid)) {
            const fullSearchableAddress = `${req.body.addressLine1} ${req.body.city} ${PROVINCE_MAP.get(req.body.province)} ${DEFAULT_COUNTRY}`;
            const coordinates = await getGeographicalCoordinatesFromAddress(fullSearchableAddress);
            await memberListingLocationController.addMemberListingLocation(
                parseFloat(coordinates.latitude),
                parseFloat(coordinates.longitude),
                listing.id
            );
        }

        res.status(200).json({ success: true, listing: listing });
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

const findListing = listingId => {
    return Listing.findByPk(listingId);
}

const findListingWithCategory = listingId => {
    return Listing.findByPk(listingId, {
        include: [
            {
                model: ListingCategory
            }
        ]
    });
}

const searchMemberServiceListings = async (searchArea, categoryName) => {
    const memberServiceListings = await Listing.findAll({
        where: {
            isDeleted: false
        },
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

    return filteredLocations.map(listing => formatMemberListing(listing));
}

const searchBusinessListings = async (searchArea, categoryName, subcategoryNames) => {
    const businessListings = await Listing.findAll({
        where: {
            isDeleted: false,
            dateAdminApproved: {
                [Op.lt]: new Date()
            },
            dateExpired: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.gt]: new Date()
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

    const formattedListingInfo = businessListingsFilteredByLocation.map(listing => {
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
            },
            images: getListingImages(listing.id)
        }
    });
    return formattedListingInfo;
}

const softDeleteUsersListings = uid => {
    return Listing.update({
        isDeleted: true
    }, {
        where: {
            uid: uid
        }
    });
}

const getAllPendingListings = () => {
    return Listing.findAll({
        where: {
            dateAdminApproved: null,
            isDeleted: false
        },
        include: [
            {
                model: AbstractUser,
                include: [
                    {
                        model: BusinessAccount
                    }
                ]
            },
            {
                model: ListingCategory,
                where: {
                    name: {
                        [Op.not]: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME
                    }
                }
            },
            {
                model: ListingSubcategory
            }

        ]
    });
}

const approveListing = id => {
    return Listing.update({
        dateAdminApproved: Date.now()
    }, {
        where: {
            id: id
        }
    })
}

const deleteListing = id => {
    return Listing.update({
        isDeleted: true
    }, {
        where: {
            id: id
        }
    })
}

const findAllListingsForUser = uid => {
    return Listing.findAll({
        where: {
            uid: uid
        }
    });
}

const getBusinessPendingListings = uid => {
    return Listing.findAll({
        where: {
            dateAdminApproved: null,
            isDeleted: false,
            uid: uid
        },
        include: [
            {
                model: AbstractUser,
                include: [
                    {
                        model: BusinessAccount
                    }
                ]
            },
            {
                model: ListingCategory,
                where: {
                    name: {
                        [Op.not]: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME
                    }
                }
            },
            {
                model: ListingSubcategory
            }

        ]
    });
}

const getBusinessLiveListings = uid => {
    return Listing.findAll({
        where: {
            dateAdminApproved: {
                [Op.lt]: new Date()
            },
            dateExpired: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.gt]: new Date()
                }
            },
            isDeleted: false,
            uid: uid
        },
        include: [
            {
                model: AbstractUser,
                include: [
                    {
                        model: BusinessAccount
                    }
                ]
            },
            {
                model: ListingCategory,
                where: {
                    name: {
                        [Op.not]: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME
                    }
                }
            },
            {
                model: ListingSubcategory
            }
        ]
    });
}

// business listings that were deleted by the user or expired
const getBusinessInactiveListings = uid => {
    return Listing.findAll({
        where: {
            [Op.or]: {
                dateExpired: {
                    [Op.lt]: new Date()
                },
                isDeleted: true,
            },
            dateAdminApproved: {
                [Op.not]: null,
            },
            uid: uid
        },
        include: [
            {
                model: AbstractUser,
                include: [
                    {
                        model: BusinessAccount
                    }
                ]
            },
            {
                model: ListingCategory,
                where: {
                    name: {
                        [Op.not]: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME
                    }
                }
            },
            {
                model: ListingSubcategory
            }
        ]
    });
}

// business listings that were rejected by the admin
const getBusinessRejectedListings = uid => {
    return Listing.findAll({
        where: {
            isDeleted: true,
            dateAdminApproved: null,
            uid: uid
        },
        include: [
            {
                model: AbstractUser,
                include: [
                    {
                        model: BusinessAccount
                    }
                ]
            },
            {
                model: ListingCategory,
                where: {
                    name: {
                        [Op.not]: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME
                    }
                }
            },
            {
                model: ListingSubcategory
            }
        ]
    });
}

const getMemberLiveListings = uid => {
    return Listing.findAll({
        where: {
            uid: uid,
            isDeleted: false,
        },
        include: [
            {
                model: ListingCategory,
                where: {
                    name: Object.values(MEMBER_SERVICE_CATEGORIES)
                }
            },
            {
                model: MemberListingLocation
            }
        ]
    });
}

const getMemberInactiveListings = uid => {
    return Listing.findAll({
        where: {
            uid: uid,
            isDeleted: true,
        },
        include: [
            {
                model: ListingCategory,
                where: {
                    name: Object.values(MEMBER_SERVICE_CATEGORIES)
                }
            },
            {
                model: MemberListingLocation
            }
        ]
    });
}

const findPendingOrLiveListing = listingId => {
    return Listing.findOne({
        where: {
            id: listingId,
            isDeleted: false,
            dateAdminApproved: {
                [Op.or]: {
                    [Op.lt]: new Date(),
                    [Op.eq]: null
                }
            },
            dateExpired: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.gt]: new Date()
                }
            },
        }
    });
}

const findDeletedListing = listingId => {
    return Listing.findOne({
        where: {
            id: listingId,
            [Op.or] : {
                isDeleted: true,
                dateExpired: {
                    [Op.lt]: new Date()
                }
            }
        }
    });
}

const updateListingFields = listing => {
    return Listing.update(listing, {
        where: {
            id: listing.id
        }
    });
}

const editListing = async req => {
    try {
        const updatedListingData = {
            id: req.body.listingId,
            fields: JSON.stringify(getListingFields(req, req.query.category))
        };

        // update the listing
        await updateListingFields(updatedListingData);

        // if the listing a member service listing, update the location
        if (includes(Object.values(MEMBER_SERVICE_CATEGORIES), req.query.category)) {
            const fullSearchableAddress = `${req.body.addressLine1} ${req.body.city} ${PROVINCE_MAP.get(req.body.province)} ${DEFAULT_COUNTRY}`;
            const coordinates = await getGeographicalCoordinatesFromAddress(fullSearchableAddress);
            await memberListingLocationController.updateMemberListingLocation(
                parseFloat(coordinates.latitude),
                parseFloat(coordinates.longitude),
                req.body.listingId
            );
        }

        return { updated: true };
    }
    catch(err) {
        return { updated: false, err: err.message };
    }
}

const updateListingSubcategories = async req => {
    try {
        const listing = await findListingWithCategory(req.body.listingId);
        const category = listing.ListingCategory.name;
        // if the listing is a business listing, check for updates to the subcategories
        if (includes(BUSINESS_LISTING_CATEGORIES, category)) {
            const subcategories = await listing.getListingSubcategories();
            const subcategoryNames = subcategories.map(subcategory => subcategory.name);

            const subcategoriesToRemoveNames = difference(subcategoryNames, req.body.subcategories);
            const subcategoriesToAddNames = difference(req.body.subcategories, subcategoryNames);

            const subcategoriesToRemove = await listingSubcategoryController.findListingSubcategoryIds(
                subcategoriesToRemoveNames,
                listing.ListingCategoryId
            );
            const subcategoriesToAdd = await listingSubcategoryController.findListingSubcategoryIds(
                subcategoriesToAddNames,
                listing.ListingCategoryId
            );

            await listing.removeListingSubcategories(subcategoriesToRemove);
            await listing.addListingSubcategories(subcategoriesToAdd);
        }
        return { updated: true }
    }
    catch (err) {
        return { updated: false, err: err.message };
    }
}

const findListingSubcategories = async (req, res) => {
    const listing = await Listing.findByPk(req.body.listingId);

    const subcategories = await listing.getListingSubcategories();
    const subcategoryNames = subcategories.map(subcategory => subcategory.name);

    res.status(200).json({ subcategories: subcategoryNames });
}

module.exports = {
    createListing,
    findAllListings,
    findListing,
    findListingWithCategory,
    searchMemberServiceListings,
    searchBusinessListings,
    softDeleteUsersListings,
    getAllPendingListings,
    approveListing,
    deleteListing,
    findAllListingsForUser,
    getBusinessPendingListings,
    getBusinessLiveListings,
    getBusinessInactiveListings,
    getBusinessRejectedListings,
    getMemberLiveListings,
    getMemberInactiveListings,
    findPendingOrLiveListing,
    findDeletedListing,
    editListing,
    updateListingSubcategories,
    findListingSubcategories
}

