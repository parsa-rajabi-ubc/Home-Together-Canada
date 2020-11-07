const express = require('express');
const router = express.Router();
const accounts = require('./controllers/accountController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Create user
router.post('/register/abstractUser/', function (req, res, next) {
    accounts.createAbstractUser(req, res);
});

// Get user
router.get('/abstractUser/:id', function (req, res, next) {
    accounts.findAbstractUser(req, res);
});

// get all users
router.get('/all/', function (req, res, next) {
    accounts.findAllAbstractUsers(req, res);
} )

module.exports = router;
