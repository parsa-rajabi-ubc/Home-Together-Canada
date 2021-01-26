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
const abstractUsers = require('../controllers/abstractUserController');
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

router.get('/info/',
    isLoggedIn,
    userIsMember,
    function (req, res, next) {
        let memberData = {};

        abstractUsers.findAbstractUser(req.user.uid)
            .then(abstractUser => {
                memberData = {
                    ...abstractUser.dataValues
                };
                return memberAccounts.findMemberAccountByUid(req.user.uid)
            })
            .then(member => {
                memberData = {
                    ...memberData,
                    ...member.dataValues
                };

                res.status(200).json({ member: accountUtils.getMemberAccountInfo(memberData)});
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            });
    });

router.get('/profile/',
    isLoggedIn,
    userIsMember,
    function (req, res, next) {
        memberAccounts.findMemberAccountByUid(req.user.uid)
            .then(member => {
                const profile = accountUtils.getProfile(member.dataValues);
                res.status(200).json({ profile });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            })
    }
    )

router.post('/search/profiles/',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('memberSearchFilters'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            memberAccounts.getMemberProfilesMatchingSearchFilters(req.user.uid,{ ...req.body })
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

