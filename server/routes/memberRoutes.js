/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.15
 *
 * @Description: all routes for requests related to member users
 *
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validationResult } = require('express-validator/check');

const usersValidator = require('../controllers/validators/userControllerValidator');
const memberAccounts = require('../controllers/memberAccountController');
const accountUtils = require('../controllers/utils/accountControllerUtils');
const { isLoggedIn, userIsMember } = require('./routeUtils');


// Get all member accounts
router.get('/all/', function (req, res, next) {
    memberAccounts.findAllMemberAccounts(req, res);
});

router.post('/create/', usersValidator.validate('createMemberUser'),
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

router.post('/search/profiles/',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('memberSearchFilters'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            memberAccounts.getMemberProfilesMatchingSearchFilters(req.user.uid,{ searchFilters: req.body })
                .then(results => {
                    const profiles = accountUtils.getFilteredProfilesInformation(results);

                    res.status(200).json({ profiles });
                })
                .catch(err => {
                    res.status(500).json({ msg: 'Something went wrong while fitlering'});
                })
        }
    })

module.exports = router;

