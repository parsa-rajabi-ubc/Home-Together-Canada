/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: all routes for requests related to general users
 *
 */

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');
const passport = require('passport');

const usersValidator = require('../controllers/validators/userControllerValidator');
const abstractUsers = require('../controllers/abstractUserController');
const businessAccounts = require('../controllers/businessAccountController');
const memberAccounts = require('../controllers/memberAccountController');
const { isLoggedIn } = require('./routeUtils');

// Create abstract user
router.post('/create/', function (req, res, next) {
    abstractUsers.createAbstractUser(req, res);
});

// get all abstract users
router.get('/all/', function (req, res, next) {
    abstractUsers.findAllAbstractUsers(req, res);
});

// check if user is authenticated
router.get('/checkAuth/',isLoggedIn, function(req, res, next) {
    res.send({ authenticated: true });
});

// response after successful login and registration
router.get('/successfulLogin/', async function (req, res, next) {
    const uid = req.user.uid;

    const member = await memberAccounts.findMemberAccountByUid(uid);
    const business = await businessAccounts.findBusinessByUid(uid);

    if (!member && !business) {
        res.status(202).json({error: 'cannot find user'});
    } else {
        let responseData = {
            user: {...req.user},
            authenticated: true
        };

        if (member) {
            responseData.member = { ...member.dataValues };
        } else {
            responseData.business = { ...business.dataValues };
        }
        res.status(200).json(responseData);
    }
});

// logout
router.get('/logout/', function (req, res) {
    req.session.destroy(function (err) {
        if (err) console.log(err)
        res.redirect('/user/checkAuth/');
    });
});

// login user
router.post("/login/", usersValidator.validate('loginUser'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            passport.authenticate('local-signin',
                {
                    successRedirect: '/user/successfulLogin/',
                    failureRedirect: '/user/checkAuth/',
                    failureFlash: false
                })(req, res, next);
        }
    }
);

// request to change password
router.post('/changePassword/', isLoggedIn, usersValidator.validate('changePassword'),
    function(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array()});
        } else {
            abstractUsers.changePassword(req, res);
        }
    });

// Get a specific abstract user
// This route MUST BE LAST
router.get('/:id', function (req, res, next) {
    abstractUsers.findAbstractUser(req, res);
});

module.exports = router;
