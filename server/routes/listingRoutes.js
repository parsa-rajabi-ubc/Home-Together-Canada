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

const listingValidator = require('../controllers/validators/listingControllerValidator');
const { LISTING_VALIDATION_METHODS, CATEGORY_FORM_VALIDATION_DICT } = require('../controllers/validators/listingControllerValidatorUtils');
const { isLoggedIn } = require('./routeUtils');

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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
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
            // TODO: add listing to DB
            res.status(202).json({ success: true });
        }
    }
);


module.exports = router;
