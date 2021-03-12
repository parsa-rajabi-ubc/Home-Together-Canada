/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.09
 *
 * @Description: all routes for requests related to admins users
 *
 */

const express = require('express');
const router = express.Router();

const { isLoggedIn, userIsMember, userIsAdmin } = require('./routeUtils');
const memberAccounts = require('../controllers/memberAccountController');
const { getUsernameFromAbstractUser } = require('../controllers/utils/accountControllerUtils');

// NOTE: this route is only for development purposes as a means to make the first admin
router.get('/dev/create/',
    isLoggedIn,
    userIsMember,
    function (req, res, next) {
        memberAccounts.giveAdminPrivileges(req.user.uid)
            .then(data => {
                if (data.length) {
                    res.status(200).json({ adminPrivileges: true });
                } else {
                    res.status(500).json({ err: `Failed to give user with id ${req.user.uid} admin privileges`});
                }
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    }
);

// give another member admin privileges
router.post('/create/',
    isLoggedIn,
    userIsAdmin,
    async function (req, res, next) {
        // get the uid for the given username
        const member = await memberAccounts.findMemberAccountByUsername(req.body.username);

        // give admin privileges
        memberAccounts.giveAdminPrivileges(member.uid)
            .then(data => {
                if (data.length) {
                    res.status(200).json({ adminPrivileges: true });
                } else {
                    res.status(500).json({ err: `Failed to give user with id ${req.user.uid} admin privileges`});
                }
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    }
);

// list of usernames for all admins
router.get('/all/',
    isLoggedIn,
    userIsAdmin,
    function (req, res, next) {
        memberAccounts.getAllAdminUsernames()
            .then(admins => {
                const formattedListAdmins = admins.map(admin => getUsernameFromAbstractUser(admin.AbstractUser));
                res.status(200).json({ admins: formattedListAdmins });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            })
    }
);

module.exports = router;
