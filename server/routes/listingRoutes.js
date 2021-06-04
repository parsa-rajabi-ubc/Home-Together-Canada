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
const last = require('lodash/last');
const fs = require('fs');

const listingValidator = require('../controllers/validators/listingControllerValidator');
const { LISTING_VALIDATION_METHODS, CATEGORY_FORM_VALIDATION_DICT } = require('../controllers/validators/listingControllerValidatorUtils');
const { isLoggedIn } = require('./routeUtils');
const listingCategoryController = require('../controllers/listingCategoryController');
const listingSubcategoryController = require('../controllers/listingSubcategoryController');
const listingController = require('../controllers/listingController');
const listingAssignedSubcategoryController = require('../controllers/listingAssignedSubcategoryController');
const memberListingLocationController = require('../controllers/memberListingLocationController');
const multer = require("multer");
const {LISTING_IMAGE_UPLOADS_PATH} = require("../constants/listingConstants");
const { MEMBER_SERVICE_CATEGORIES } = require('../constants/listingConstants');
const { DEVELOPMENT } = require('../constants/environmentConstants');

// store a listings image in its own directory to optimize search speed
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        listingController.findAllListingsForUser(req.user.uid)
            .then(listings => {
                const mostRecentListing = last(listings);
                const listingId = mostRecentListing.id;
                const filepath = LISTING_IMAGE_UPLOADS_PATH + listingId + '/';
                fs.mkdir(filepath, () => {
                    cb(null, filepath);
                });
            });
    },
    filename: function (req, file, cb) {
        listingController.findAllListingsForUser(req.user.uid)
            .then(listings => {
                const mostRecentListing = last(listings);
                const listingId = mostRecentListing.id;
                const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, (listingId + '-' + Date.now() + ext));
            });
    }
});

const uploads = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024  // 2 MB
    }
}).array('images', 6);

router.post('/pictures/upload/',
    isLoggedIn,
    (req, res) => {
        uploads(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(403).json({ err });
            } else if (err) {
                res.status(403).json({ err });
            } else if (!req.files) {
                res.status(403).json({ err: 'No file to upload' });
            } else {
                res.status(200).json({ success: true });
            }
    });
});

router.post('/pictures/filenames/', function (req, res, next) {
    const listingId = req.body.listingId;
    const destinationDirectory = LISTING_IMAGE_UPLOADS_PATH + listingId + '/';

    // make sure listing has images
    if (fs.existsSync(destinationDirectory)) {
        fs.readdir(destinationDirectory, (err, files) => {
            if (err) {
                res.status(500).json({ error: 'Error getting listing images'});
            } else {
                const filepaths = [];
                files.forEach(file => {
                    filepaths.push(destinationDirectory + file);
                });
                res.status(200).json({ imageAddresses: filepaths });
            }
        });
    }
    // case where listing does not have images
    else {
        res.status(200).json({ imageAddresses: [] });
    }

});

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
}

module.exports = router;
