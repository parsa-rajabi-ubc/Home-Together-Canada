/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: all routes for requests to the express apps
 *
 */

const express = require('express');
const router = express.Router();
const accounts = require('./controllers/accountController');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Create user
router.post('/register/abstractUser/', function (req, res, next) {
    accounts.createAbstractUser(req, res);
});

// get all users
router.get('/abstractUser/all/', function (req, res, next) {
    accounts.findAllAbstractUsers(req, res);
});

// Get user
router.get('/abstractUser/:id', function (req, res, next) {
    accounts.findAbstractUser(req, res);
});

/* GET React App */
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = router;
