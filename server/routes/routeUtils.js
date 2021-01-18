/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.13
 *
 * @Description: helper functions used in routes
 *
 */

const businessAccounts = require('../controllers/businessAccountController');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send({ authenticated: false });
}

async function userIsBusiness(req, res, next) {
    const business = await businessAccounts.findBusinessByUid(req.user.uid);
    if (business) {
        return next();
    }
    res.json({ err: 'User is not a business' });
}

module.exports = {
    isLoggedIn,
    userIsBusiness
}
