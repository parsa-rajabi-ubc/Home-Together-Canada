/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.15
 *
 * @Description: all routes for requests related to member users
 *
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validationResult } = require('express-validator/check');

const usersValidator = require('../controllers/validators/userControllerValidator');
const memberAccounts = require('../controllers/memberAccountController');
const abstractUsers = require('../controllers/abstractUserController');
const accountUtils = require('../controllers/utils/accountControllerUtils');
const livesWith = require('../controllers/livesWithController');
const areasOfInterest = require('../controllers/areaOfInterestController');
const { getRoommatesUsernames } = require('../controllers/utils/statusUtils');
const { getCircularFeatureFromLocation } = require('../controllers/utils/locationUtils');
const { getListOfAreaOfInterestObjects } = require('../controllers/utils/areaOfInterestUtils');
const { isLoggedIn, userIsMember, userIsInactive, userIsActive } = require('./routeUtils');


// Get all member accounts
router.get('/all/', function (req, res, next) {
    memberAccounts.findAllMemberAccounts(req, res);
});

// add validation to isInterestedInBuyingHome fields
router.post('/create/', usersValidator.validate('createMemberUser'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            passport.authenticate('local-signup-member', {
                // change these routes to ones that send actual response data
                successRedirect: '/user/successfulLogin/',
                failureRedirect: '/user/checkAuth/',
                failureFlash: false })(req, res, next);
        }
    });

router.get('/info/',
    isLoggedIn,
    userIsMember,
    function (req, res, next) {
        let memberData = {};

        abstractUsers.findAbstractUser(req.user.uid)
            .then(abstractUser => {
                memberData = {
                    ...abstractUser.dataValues
                };
                return memberAccounts.findMemberAccountByUid(req.user.uid)
            })
            .then(member => {
                memberData = {
                    ...memberData,
                    ...member.dataValues
                };

                res.status(200).json({ member: accountUtils.getMemberAccountInfo(memberData)});
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            });
    });


router.post('/info/update/',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('updateMemberAccountInfo'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            abstractUsers.updateAbstractUser(req, res)
                .then(abstractUser => {
                    if (abstractUser.length) {
                        res.status(200).json({ success: true });
                    } else {
                        res.status(500).json({ success: false });
                    }
                })
                .catch(err => {
                    res.status(500).json({ err: err.message });
                })
        }
    }
);

router.post('/profile/status/update/',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('updateMemberStatus'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            memberAccounts.updateMemberStatusAndRoommates(req)
                .then(response => res.json({...response}));
        }
    }
);

router.post('/profile/areasOfInterest/update/',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('updateMemberAreasOfInterest'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            memberAccounts.updateMemberAreaOfInterest(req)
                .then(response => {
                    res.json({...response});
                })
        }
    }
);

router.post('/profile/update',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('updateMemberProfile'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            memberAccounts.updateMemberProfile(req, req.user.uid)
                .then(data => {
                    if (data.length) {
                        res.status(200).json({ success: true });
                    } else {
                        res.status(200).json({ success: false });
                    }
                })
        }
    }
);

router.get('/profile/',
    isLoggedIn,
    userIsMember,
    function (req, res, next) {
        let member = {};
        memberAccounts.findMemberAccountByUid(req.user.uid)
            .then(memberAccount => {
                member = {
                    profile: {
                        ...accountUtils.getProfile(memberAccount.dataValues),
                        username: req.user.username
                    }
                }
                return livesWith.findMemberRoommatesInfo(req.user.uid)
            })
            .then(roommates => {
                member = {
                    ...member,
                    roommates: getRoommatesUsernames(roommates)
                }
                return areasOfInterest.findAreasOfInterestForUser(req.user.uid);
            })
            .then(areasOfInterest => {
                member = {
                    ...member,
                    areasOfInterest: getListOfAreaOfInterestObjects(areasOfInterest)
                }

                res.status(200).json({ member });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            })
    }
);

router.post('/filters/update/',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('updateMemberSearchFilters'),
    function (req, res, next) {
        memberAccounts.updateMemberSearchFilters(req.user.uid, req)
            .then(data => {
                if (data && data.length) {
                    res.status(202).json({ success: true });
                } else {
                    res.status(202).json()
                }
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            })
    }
);

router.get('/filters/', isLoggedIn, userIsMember, function(req, res, next) {
    memberAccounts.getMemberSearchFilters(req.user.uid)
        .then(searchFilters => {
            res.json({ ...searchFilters.dataValues });
        })
        .catch(err => {
            res.json({ err: err.message });
        })
});

router.post('/search/profiles/',
    isLoggedIn,
    userIsMember,
    usersValidator.validate('memberSearchRequest'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            getCircularFeatureFromLocation(req.body.searchArea.province, req.body.searchArea.city, req.body.searchArea.radius)
                .then(feature => {
                    return memberAccounts.getMemberProfilesMatchingSearchFilters(
                        req.user.uid,
                        { ...req.body },
                        feature
                    );
                })
                .then(results => {
                    const profiles = accountUtils.getFilteredProfilesInformation(results);
                    res.status(200).json({ profiles });
                })
                .catch(err => {
                    // This console is being left in on purpose for debugging (until logging can be implemented)
                    console.log('error in search profiles route: ', err);
                    res.status(500).json({ err: err.message });
                })
        }
    });

router.get('/active/status/',
    isLoggedIn,
    userIsMember,
    function (req, res, next) {
        memberAccounts.findMemberAccountByUid(req.user.uid)
            .then(member => {
                res.status(200).json({
                    active: member.dataValues.active,
                    deactivationReason: member.dataValues.deactivationReason
                });
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            })
    }
);

router.get('/activate/',
    isLoggedIn,
    userIsMember,
    userIsInactive,
    function (req,res,next){
        memberAccounts.activateAccount(req.user.uid)
            .then(data => {
                if (data.length) {
                    res.status(200).json({ success: true });
                } else {
                    res.status(500).json({ success: false, err: 'Unable to activate account' });
                }
            })
            .catch(err => {
                res.status(500).json({ success: false, err: err.message });
            })
});

router.post('/deactivate/',
    isLoggedIn,
    userIsMember,
    userIsActive,
    usersValidator.validate('deactivateMemberAccount'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            memberAccounts.deactivateAccount(req.user.uid, req.body.reason)
                .then(data => {
                    if (data.length) {
                        res.status(200).json({success: true});
                    } else {
                        res.status(500).json({success: false, err: 'Unable to deactivate account'});
                    }
                })
                .catch(err => {
                    res.status(500).json({success: false, err: err.message});
                })
        }
    }
);

module.exports = router;

