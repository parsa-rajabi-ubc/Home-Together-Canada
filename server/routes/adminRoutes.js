/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.09
 *
 * @Description: all routes for requests related to admins users
 *
 */

const express = require('express');
const router = express.Router();
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

const { isLoggedIn, userIsMember, userIsAdmin } = require('./routeUtils');
const memberAccounts = require('../controllers/memberAccountController');
const abstractUsers = require('../controllers/abstractUserController');
const businessAccounts = require('../controllers/businessAccountController');
const listings = require('../controllers/listingController');
const usersValidator = require('../controllers/validators/userControllerValidator');
const { getUsernameFromAbstractUser } = require('../controllers/utils/accountControllerUtils');
const listingValidator = require('../controllers/validators/listingControllerValidator');
const { LISTING_VALIDATION_METHODS } = require('../controllers/validators/listingControllerValidatorUtils');
const { formatBusinessListing } = require('../controllers/utils/listingControllerUtils');

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
    usersValidator.validate('grantAdminPrivileges'),
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


router.post('/ban/user/',
    isLoggedIn,
    userIsAdmin,
    usersValidator.validate('banUser'),
    async function (req, res, next) {
    // get uid
        const user = await abstractUsers.findUserByUsername(req.body.username);
        const uid = user.uid;

        // set isBanned to true
        abstractUsers.banUser(uid)
            .then(() => {
                // soft delete listings
                return listings.softDeleteUsersListings(uid);
            })
            .then(() => {
                res.status(200).json({ success: true });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            });
    }
);

router.get('/banned/users/',
    isLoggedIn,
    userIsAdmin,
    function (req, res, next) {
        abstractUsers.listBannedUsers()
            .then(bannedUsers => {
                const formattedListBannedUsers = bannedUsers.map(bannedUser => bannedUser.username);
                res.status(200).json({ bannedUsers: formattedListBannedUsers });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            });
    }
);

router.get('/pending/listings/',
    isLoggedIn,
    userIsAdmin,
    function (req, res, next) {
        listings.getAllPendingListings()
            .then(data => {
                const compiledListingInfo = data.map(listing => formatBusinessListing(listing));

                res.status(200).json({ compiledListingInfo });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            });
    }
);

router.post('/listing/approve/',
    isLoggedIn,
    userIsAdmin,
    listingValidator.validate(LISTING_VALIDATION_METHODS.ADMIN_APPROVE_LISTING),
    function (req, res, next) {
        if (req.body.approve) {
            listings.approveListing(req.body.listingId)
                .then(() => {
                    res.status(200).json({ success: true });
                })
                .catch(err => {
                    res.status(200).json({ success: false, err: err.message });
                });
        } else {
            listings.deleteListing(req.body.listingId)
                .then(() => {
                    res.status(200).json({ success: true });
                })
                .catch(err => {
                    res.status(200).json({ success: false, err: err.message });
                });
        }
    }
);

router.get('/export/members/',
    isLoggedIn,
    userIsAdmin,
    function (req, res, next) {
        memberAccounts.getAllMemberData()
            .then(data => {
                const formattedMembersList = data.map(member => {
                    const formattedMember = {
                        ...member.dataValues,
                        ...member.AbstractUser.dataValues,
                        AbstractUser: undefined
                    }
                    return formattedMember;
                });

                const jsonData = JSON.parse(JSON.stringify(formattedMembersList));

                const json2csvParser = new Json2csvParser({ header: true});
                const csv = json2csvParser.parse(jsonData);

                fs.writeFile("home_together_members.csv", csv, function(error) {
                    if (error) throw error;
                    res.attachment('home_together_members.csv').send(csv)
                });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            });
    }
);

router.get('/export/businesses/',
    isLoggedIn,
    userIsAdmin,
    function (req, res, next) {
        businessAccounts.getAllBusinessData()
            .then(data => {
                const formattedBusinessesList = data.map(business => {
                    const formattedBusiness = {
                        ...business.dataValues,
                        ...business.AbstractUser.dataValues,
                        AbstractUser: undefined
                    }
                    return formattedBusiness;
                });

                const jsonData = JSON.parse(JSON.stringify(formattedBusinessesList));

                const json2csvParser = new Json2csvParser({ header: true});
                const csv = json2csvParser.parse(jsonData);

                fs.writeFile("home_together_businesses.csv", csv, function(error) {
                    if (error) throw error;
                    res.attachment('home_together_businesses.csv').send(csv)
                });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
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
            });
    }
);

router.post(
    '/password/reset/',
    isLoggedIn,
    userIsAdmin,
    usersValidator.validate('adminHardResetPassword'),
    function (req, res, next) {
        abstractUsers.changeUserPassword(req.body.username, req.body.password)
            .then(data => {
                res.status(200).json({ data });
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    }
);


module.exports = router;
