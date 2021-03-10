/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.09
 *
 * @Description: all routes for requests related to admins users
 *
 */

const express = require('express');
const router = express.Router();

const { isLoggedIn, userIsMember } = require('./routeUtils');
const memberAccounts = require('../controllers/memberAccountController');

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

module.exports = router;
