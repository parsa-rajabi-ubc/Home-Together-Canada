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
const { validationResult } = require('express-validator/check');

const abstractUsers = require('./controllers/abstractUserController');
const businessAccounts = require('./controllers/businessAccountController');
const memberAccounts = require('./controllers/memberAccountController');
const usersValidator = require('./controllers/validators/userControllerValidator');
const roommates = require("./controllers/livesWithController");
const areasOfInterest = require("./controllers/areaOfInterestController");
const { isLoggedIn } = require('./routes/routeUtils');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Create abstract user
router.post('/register/abstractUser/', function (req, res, next) {
    abstractUsers.createAbstractUser(req, res);
});

// get all abstract users
router.get('/abstractUser/all/', function (req, res, next) {
    abstractUsers.findAllAbstractUsers(req, res);
});

// Get a specific abstract user
router.get('/abstractUser/:id', function (req, res, next) {
    abstractUsers.findAbstractUser(req, res);
});

// Get all member accounts
router.get('/memberAccount/all/', function (req, res, next) {
    memberAccounts.findAllMemberAccounts(req, res);
});

router.post('/member/create/', usersValidator.validate('createMemberUser'),
    function (req, res, next) {
        const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(202).json({ errors: errors.array()});
            } else {
                passport.authenticate('local-signup-member', {
                    // change these routes to ones that send actual response data
                    successRedirect: '/successfulLogin/',
                    failureRedirect: '/checkAuth',
                    failureFlash: false })(req, res, next);
            }
    });

// check if user is authenticated
router.get('/checkAuth/',isLoggedIn, function(req, res, next) {
    res.send({ authenticated: true });
});

// Get all roommates (existing groups & partners). TESTING ONLY
router.get('/roommates/', function(req, res, next) {
    roommates.findAllRoommates(req, res);
});

// Get all areas of interest. TESTING ONLY
router.get('/areasOfInterest/', function(req, res, next) {
    areasOfInterest.findAllAreasOfInterestsForAllUsers(req, res);
});

// logout
router.get('/logout/', function (req, res) {
    req.session.destroy(function (err) {
        if (err) console.log(err)
        res.redirect('/checkAuth/');
    });
});

// login user
router.post("/login/user/", usersValidator.validate('loginUser'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            passport.authenticate('local-signin',
                {
                    successRedirect: '/successfulLogin/',
                    failureRedirect: '/checkAuth',
                    failureFlash: false
                })(req, res, next);
        }
    }
);

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

// request to change password
router.post('/changePassword', isLoggedIn, usersValidator.validate('changePassword'),
    function(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array()});
        } else {
            abstractUsers.changePassword(req, res);
        }
    });

/* GET React App */
// NOTE: This route MUST be at the last route in this file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

module.exports = router;
