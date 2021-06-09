/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.06.06
 *
 * @Description: helper functions used in listing routes
 *
 */

const listingController = require('../controllers/listingController');
const { validationResult } = require('express-validator/check');

function updateListing(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).json({ errors: errors.array()});
    } else {
        listingController.editListing(req)
            .then(updated => {
                res.json(updated);
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            })
    }
}

module.exports = {
    updateListing
}
