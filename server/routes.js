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

const roommates = require("./controllers/livesWithController");
const areasOfInterest = require("./controllers/areaOfInterestController");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
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
