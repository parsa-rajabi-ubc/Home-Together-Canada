/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.19
 *
 * @Description: all routes for requests related to listing
 *
 */

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');
const includes = require('lodash/includes');

const listingValidator = require('../controllers/validators/listingControllerValidator');
const { LISTING_VALIDATION_METHODS, CATEGORY_FORM_VALIDATION_DICT } = require('../controllers/validators/listingControllerValidatorUtils');
const { isLoggedIn, userIsMember, userIsBusiness, errorDuringValidation } = require('./routeUtils');
const listingCategoryController = require('../controllers/listingCategoryController');
const listingSubcategoryController = require('../controllers/listingSubcategoryController');
const listingController = require('../controllers/listingController');
const listingAssignedSubcategoryController = require('../controllers/listingAssignedSubcategoryController');
const memberListingLocationController = require('../controllers/memberListingLocationController');
const { MEMBER_SERVICE_CATEGORIES } = require('../constants/listingConstants');
const { DEVELOPMENT } = require('../constants/environmentConstants');
const {
    updateListing,
    uploadListingImages,
    uploadEditedListingImages,
    deleteListingImages
} = require('./listingRoutesUtils');

router.post('/pictures/upload/',
    isLoggedIn,
    uploadListingImages
);

router.post(
    '/images/delete/',
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.DELETE_LISTING_IMAGES),
    errorDuringValidation,
    deleteListingImages
);

router.post(
    '/images/edit/',
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.EDIT_LISTING_IMAGES),
    uploadEditedListingImages,
);

router.post('/create/',
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.BASIC_LISTING_INFO),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            // temporary redirect because you can't redirect with POST requests - see https://stackoverflow.com/questions/38810114/node-js-with-express-how-to-redirect-a-post-request
            res.redirect(307, `/listing/create/${CATEGORY_FORM_VALIDATION_DICT.get(req.body.category)}`)
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.MEMBER_HOME_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.MEMBER_HOME_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.CO_HOUSING_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.CO_HOUSING_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.HOME_SHARE_FACILITATION_BUSINESS_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.HOME_SHARE_FACILITATION_BUSINESS_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.GOVERNMENT_SERVICES_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.GOVERNMENT_SERVICES_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.RENTALS_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.RENTALS_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.HOUSE_YARD_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.HOUSE_YARD_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.LEGAL_SALES_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.LEGAL_SALES_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post(`/create/${LISTING_VALIDATION_METHODS.CLASSES_EVENTS_CLUBS_FORM}`,
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.CLASSES_EVENTS_CLUBS_FORM),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            listingController.createListing(req, res);
        }
    }
);

router.post('/search/', listingValidator.validate(LISTING_VALIDATION_METHODS.SEARCH_LISTINGS),
    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({ errors: errors.array()});
        } else {
            if (includes(Object.values(MEMBER_SERVICE_CATEGORIES), req.body.category)) {
                // do a member listing search
                listingController.searchMemberServiceListings(req.body.searchArea, req.body.category)
                    .then(data => {
                        res.status(200).json({ listings: data });
                    })
                    .catch(err => {
                        res.status(500).json({ err: err.message });
                    })
            } else {
                // do a business listing search
                listingController.searchBusinessListings(req.body.searchArea, req.body.category, req.body.subcategories)
                    .then(listings => {
                        res.status(200).json({ listings });
                    })
                    .catch(err => {
                        res.status(500).json({ err: err.message });
                    });
            }
        }
    }
);

router.post(
    '/edit/',
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.LISTING_RELATIONSHIPS),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            // get listing category
            listingController.findListingWithCategory(req.body.listingId)
                .then(listing => {
                    const category = listing.ListingCategory.name;
                    res.redirect(
                        307,
                        `/listing/edit/${CATEGORY_FORM_VALIDATION_DICT.get(category)}?category=${encodeURIComponent(category)}`
                    );
                });
        }
    },
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.MEMBER_HOME_FORM}`,
    isLoggedIn,
    userIsMember,
    listingValidator.validate(LISTING_VALIDATION_METHODS.MEMBER_HOME_FORM),
    updateListing
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.CO_HOUSING_FORM}`,
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.CO_HOUSING_FORM),
    updateListing
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.HOME_SHARE_FACILITATION_BUSINESS_FORM}`,
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.HOME_SHARE_FACILITATION_BUSINESS_FORM),
    updateListing
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.GOVERNMENT_SERVICES_FORM}`,
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.GOVERNMENT_SERVICES_FORM),
    updateListing
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.RENTALS_FORM}`,
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.RENTALS_FORM),
    updateListing
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.HOUSE_YARD_FORM}`,
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.HOUSE_YARD_FORM),
    updateListing
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.LEGAL_SALES_FORM}`,
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.LEGAL_SALES_FORM),
    updateListing
);

router.post(
    `/edit/${LISTING_VALIDATION_METHODS.CLASSES_EVENTS_CLUBS_FORM}`,
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.CLASSES_EVENTS_CLUBS_FORM),
    updateListing
);

router.post(
    '/delete/',
    isLoggedIn,
    listingValidator.validate(LISTING_VALIDATION_METHODS.DELETE_LISTING),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            listingController.deleteListing(req.body.listingId)
                .then(() => {
                    res.status(200).json({ success: true });
                })
                .catch(err => {
                    res.status(200).json({ success: false, err: err.message });
                });
        }
    }
);

router.post(
    '/subcategories/update/',
    isLoggedIn,
    userIsBusiness,
    listingValidator.validate(LISTING_VALIDATION_METHODS.UPDATE_LISTING_SUBCATEGORIES),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            listingController.updateListingSubcategories(req)
                .then(updated => {
                    res.json(updated);
                })
                .catch(err => {
                    res.status(500).json({ err: err.message });
                })
        }
    }
);

if (process.env.NODE_ENV === DEVELOPMENT || !process.env.NODE_ENV) {
    router.get('/categories/', function(req, res, next) {
        listingCategoryController.findAllListingCategories(req, res);
    });

    router.get('/subcategories/', function(req, res, next) {
        listingSubcategoryController.findAllListingSubcategories(req, res);
    });

    router.get('/listings/', function(req, res, next) {
        listingController.findAllListings(req, res);
    });

    router.get('/listingAssignedSubcategories/', function (req, res){
        listingAssignedSubcategoryController.findAllEntries(req, res);
    });

    router.get('/memberListingLocations/', function (req, res){
        memberListingLocationController.findAllMemberListingLocationEntries(req, res);
    });

    router.post('/listingSubcategoriesById/', function (req, res, next) {
        listingController.findListingSubcategories(req, res);
    });

    router.post('/delete/hard/', function(req, res, next) {
        listingController.hardDeleteListing(req.body.listingId)
            .then(data => {
                res.status(200).json({ data });
            })
            .catch(err => {
                res.status(500).json({ err });
            })
    });
}

module.exports = router;
