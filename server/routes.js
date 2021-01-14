/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: all routes for requests to the express apps
 *
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

const businessAccounts = require('./controllers/businessAccountController');
const memberAccounts = require('./controllers/memberAccountController');
const usersValidator = require('./controllers/validators/userControllerValidator');
const roommates = require("./controllers/livesWithController");
const areasOfInterest = require("./controllers/areaOfInterestController");
const { validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Create Business Account object (note this is only for testing purposes and will be removed
// when the workflow to register a business is complete)
router.post('/businessAccount/new/', function (req, res, next) {
   businessAccounts.createBusinessAccount(req, res);
});

// Get all business accounts
router.get('/businessAccount/all/', function(req, res, next) {
    businessAccounts.findAllBusinessAccounts(req, res);
});

// Get all member accounts
router.get('/memberAccount/all/', function (req, res, next) {
    memberAccounts.findAllMemberAccounts(req, res);
});

// Create a business user
router.post('/business/create/', usersValidator.validate('createBusinessUser'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            passport.authenticate('local-signup-business', {
                // change these routes to ones that send actual response data
                successRedirect: '/user/successfulLogin/',
                failureRedirect: '/user/checkAuth/',
                failureFlash: false })(req, res, next);
        }
});

router.post('/member/create/', usersValidator.validate('createMemberUser'),
    function (req, res, next) {
        const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(202).json({ errors: errors.array()});
            } else {
                passport.authenticate('local-signup-member', {
                    // change these routes to ones that send actual response data
                    successRedirect: '/user/successfulLogin/',
                    failureRedirect: '/user/checkAuth/',
                    failureFlash: false })(req, res, next);
            }
    });

// Get all roommates (existing groups & partners). TESTING ONLY
router.get('/roommates/', function(req, res, next) {
    roommates.findAllRoommates(req, res);
});

// Get all areas of interest. TESTING ONLY
router.get('/areasOfInterest/', function(req, res, next) {
    areasOfInterest.findAllAreasOfInterestsForAllUsers(req, res);
});

/* GET React App */
// NOTE: This route MUST be at the last route in this file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

module.exports = router;
