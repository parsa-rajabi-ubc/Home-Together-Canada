/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.09
 *
 * @Description: all routes for requests related to admins users
 *
 */

const express = require('express');
const router = express.Router();
const pick = require('lodash/pick');
const get = require('lodash/get');

const { isLoggedIn, userIsMember, userIsAdmin } = require('./routeUtils');
const memberAccounts = require('../controllers/memberAccountController');
const abstractUsers = require('../controllers/abstractUserController');
const listings = require('../controllers/listingController');
const usersValidator = require('../controllers/validators/userControllerValidator');
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
                return listings.softDeleteListings(uid);
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
                const compiledListingInfo = data.map(listing => {
                    const listingDetails = pick(
                        listing,
                        [
                            'id',
                            'uid',
                            'isDeleted',
                            'dateExpired',
                            'dateAdminApproved',
                            'isClassified',
                            'orderId',
                            'createdAt',
                            'updatedAt'
                        ]
                    );

                    const listingFields = JSON.parse(get(listing.dataValues, 'fields'));

                    const abstractUser = pick(
                        listing.dataValues.AbstractUser.dataValues,
                        [
                            'username',
                            'email',
                            'firstName',
                            'lastName',
                            'phoneNumber',
                            'addressLine1',
                            'addressLine2',
                            'city',
                            'province',
                            'postalCode'
                        ]
                    );
                    const businessAccount = pick(
                        listing.dataValues.AbstractUser.dataValues.BusinessAccount,
                        [
                            'businessName',
                            'logo',
                            'isIncorporated',
                            'incorporatedOwnersNames',
                            'businessPhoneNumber',
                            'businessCellPhoneNumber',
                            'isNationWide',
                            'mapAddressLine1',
                            'mapAddressLine2',
                            'mapCity',
                            'mapProvince',
                            'mapPostalCode',
                            'website'
                        ]
                    );

                    const category = get(
                        listing.dataValues.ListingCategory,
                        'name'
                    );

                    const subcategories = listing.dataValues.ListingSubcategories.map(subcategory => {
                        return get(subcategory, 'name');
                    });

                    return {
                        ...listingDetails,
                        ...listingFields,
                        ...abstractUser,
                        ...businessAccount,
                        category,
                        subcategories
                    }
                });

                res.status(200).json({ compiledListingInfo });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            });
    }
);

module.exports = router;
