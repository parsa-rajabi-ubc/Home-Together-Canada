/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.13
 *
 * @Description: helper functions used in routes
 *
 */

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send({ authenticated: false });
}

module.exports = {
    isLoggedIn
}
