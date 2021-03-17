/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.13
 *
 * @Description: helper functions used in routes
 *
 */

const businessAccounts = require('../controllers/businessAccountController');
const memberAccounts = require('../controllers/memberAccountController');

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

async function userIsMember(req, res, next) {
    const member = await memberAccounts.findMemberAccountByUid(req.user.uid);
    if (member) {
        return next();
    }
    res.json({ err: 'User is not a member' });
}

async function userIsAdmin(req, res, next) {
    const member = await memberAccounts.findMemberAccountByUid(req.user.uid);
    if (member && member.isAdmin) {
        return next();
    }
    res.json({ err: 'User is not an admin' });
}

function userIsInactive (req, res, next) {
    memberAccounts.findMemberAccountByUid(req.user.uid)
        .then(member => {
            if (member && !member.dataValues.active) {
                return next();
            }
            res.status(500).json({ success: false, err: 'Account is already active'});
        });
}

function userIsActive (req, res, next) {
    memberAccounts.findMemberAccountByUid(req.user.uid)
        .then(member => {
            if (member && member.dataValues.active) {
                return next();
            }
            res.status(500).json({ success: false, err: 'Account is already inactive' })
        });
}

module.exports = {
    isLoggedIn,
    userIsBusiness,
    userIsMember,
    userIsAdmin,
    userIsInactive,
    userIsActive
}
