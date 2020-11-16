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

const abstractUsers = require('./controllers/abstractUserController');
const businessAccounts = require('./controllers/businessAccountController');
const users = require('./controllers/userController');
const usersValidator = require('./controllers/validators/userControllerValidator');

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

// // Create a business user
router.post('/businessUser/create/', usersValidator.validate('createBusinessUser'), function(req, res, next) {
    users.createBusinessUser(req, res);
});

// Create Business Account object (note this is only for testing purposes and will be removed
// when the workflow to register a business is complete)
router.post('/businessAccount/new/', function (req, res, next) {
   accounts.createBusinessAccount(req, res);
});

/* GET React App */
// NOTE: This route MUST be at the last route in this file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

module.exports = router;
