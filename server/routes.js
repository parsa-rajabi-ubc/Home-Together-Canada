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

const abstractUsers = require('./controllers/abstractUserController');
const businessAccounts = require('./controllers/businessAccountController');
const usersValidator = require('./controllers/validators/userControllerValidator');
const { validationResult } = require('express-validator/check');

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

// Create Business Account object (note this is only for testing purposes and will be removed
// when the workflow to register a business is complete)
router.post('/businessAccount/new/', function (req, res, next) {
   businessAccounts.createBusinessAccount(req, res);
});

// Get all business accounts
router.get('/businessAccount/all/', function(req, res, next) {
    businessAccounts.findAllBusinessAccounts(req, res);
});

// Create a business user
router.post('/businessUser/create/', usersValidator.validate('createBusinessUser'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            passport.authenticate('local-signup', {
                // change these routes to ones that send actual response data
                successRedirect: '/checkAuth',
                failureRedirect: '/checkAuth',
                failureFlash: false })(req, res, next);
        }
});

// check if user is authenticated
router.get('/checkAuth/',isLoggedIn, function(req, res, next) {
    res.send({ authenticated: true });
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
                    successRedirect: '/checkAuth',
                    failureRedirect: '/checkAuth',
                    failureFlash: false
                })(req, res, next);
        }
    }
);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send({ authenticated: false });
}

/* GET React App */
// NOTE: This route MUST be at the last route in this file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

module.exports = router;
