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
const usersValidator = require('../controllers/validators/userControllerValidator');
const { isLoggedIn, userIsBusiness } = require('./routeUtils');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads');
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

// Get all business users
router.get('/all/', function(req, res, next) {
    businessAccounts.findAllBusinessAccounts(req, res);
});

// Create a business user
router.post('/create/', usersValidator.validate('createBusinessUser'),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            passport.authenticate('local-signup-business', {
                // change these routes to ones that send actual response data
                successRedirect: '/successfulLogin/',
                failureRedirect: '/checkAuth',
                failureFlash: false })(req, res, next);
        }
    });

// Upload logo
router.post('/upload/logo/',
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
                const image = req.file.path;

                // save address of image to DB
                businessAccounts.updateLogo(req.user.uid, image)
                    .then((data) => {
                        if (data.length) {
                            res.status(202).json({ image });
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
router.get('/remove/logo/',
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

module.exports = router;
