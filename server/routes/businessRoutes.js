/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.12
 *
 * @Description: all routes for requests related to business users
 *
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validationResult } = require('express-validator/check');
const multer = require('multer');

const businessAccounts = require('../controllers/businessAccountController');
const abstractUsers = require('../controllers/abstractUserController');
const usersValidator = require('../controllers/validators/userControllerValidator');
const { isLoggedIn, userIsBusiness } = require('./routeUtils');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/public/uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, (req.user.uid + '-' + Date.now() + ext));
    }
});

const uploads = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024  // 2 MB
    }
}).single('image');

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    // Get all business users
    router.get('/all/', function(req, res, next) {
        businessAccounts.findAllBusinessAccounts(req, res);
    });
}

// Create a business user
router.post('/create/', usersValidator.validate('createBusinessUser'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            passport.authenticate('local-signup-business', {
                // change these routes to ones that send actual response data
                successRedirect: '/user/successfulLogin/',
                failureRedirect: '/user/checkAuth/',
                failureFlash: false })(req, res, next);
        }
    });

// Update business account info
router.post('/update/',
    isLoggedIn,
    userIsBusiness,
    usersValidator.validate('updateBusinessInfo'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            abstractUsers.updateAbstractUser(req, res)
                .then(abstractUser => {
                    if (abstractUser.length) {
                        return businessAccounts.updateBusiness(req, res);

                    } else {
                        res.status(500).json({ success: false });
                    }
                })
                .then(business => {
                    if (business.length) {
                        res.status(200).json({ success: true });
                    } else {
                        res.status(500).json( { success: false });
                    }
                })
                .catch(err => {
                    res.status(500).json({ success: false, err: err.message });
                });
        }

    }
)

router.get('/info/', isLoggedIn, userIsBusiness, function (req, res, next) {
    let businessData = {};

    abstractUsers.findAbstractUser(req.user.uid)
        .then(abstractUser => {
            businessData = { ...abstractUser.dataValues };
            return businessAccounts.findBusinessByUid(req.user.uid);
        })
        .then(business => {
            businessData = { ...businessData, ...business.dataValues };
            res.status(200).json({ business: businessData });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Upload logo
router.post('/logo/upload/',
    isLoggedIn,
    userIsBusiness,
    (req, res) => {
        uploads(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(403).json({ err });
            } else if (err) {
                res.status(403).json({ err });
            } else if (!req.file) {
                res.status(403).json({ err: 'No file to upload' });
            } else {
                const imageAddress = req.file.path.substring(
                    req.file.path.indexOf('uploads'),
                    req.file.path.length
                );

                // save address of image to DB
                businessAccounts.updateLogo(req.user.uid, imageAddress)
                    .then((data) => {
                        if (data.length) {
                            res.status(202).json({ image: imageAddress });
                        } else {
                            res.status(403).json({ err: 'Failed to upload image'})
                        }
                    })
                    .catch((err) => {
                        res.status(403).json({ err: err.msg });
                    });
            }
        });
    },
);

// Remove logo
router.get('/logo/remove/',
    isLoggedIn,
    userIsBusiness,
    function (req, res, next) {
    businessAccounts.removeLogo(req.user.uid)
        .then((data) => {
            if (data.length) {
                res.status(200).json({ success: true });
            } else {
                res.status(403).json({ err: 'Failed to remove logo' });
            }
        })
        .catch((err) => {
            res.status(403).json({ err: 'Failed to remove logo' });
        });
});

router.get('/logo/',
    isLoggedIn,
    function(req, res, next) {
        businessAccounts.getLogo(req.user.uid)
            .then(logoAddress => {
                if (logoAddress.length) {
                    const photoAddress = logoAddress[0].dataValues.logo;
                    res.json({imageAddress: photoAddress});
                } else {
                    res.json({ err: 'Failed to fetch image' });
                }
            })
            .catch(err => {
                res.json({ err: err.message });
            })
    }
);

module.exports = router;
