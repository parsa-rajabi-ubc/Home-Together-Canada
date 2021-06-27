/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.06.06
 *
 * @Description: helper functions used in listing routes
 *
 */
const fs = require('fs');
const multer = require("multer");

const listingController = require('../controllers/listingController');
const { getListingImages } = require('../controllers/utils/listingControllerUtils');
const { validationResult } = require('express-validator/check');
const {LISTING_IMAGE_UPLOADS_PATH, MAX_LISTING_IMAGES} = require("../constants/listingConstants");

function updateListing(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).json({ errors: errors.array()});
    } else {
        listingController.editListing(req)
            .then(updated => {
                res.json(updated);
            })
            .catch(err => {
                res.status(500).json({ err: err.message });
            })
    }
}

// store a listings image in its own directory to optimize search speed
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('hi');
        console.log('destination body: ', req.body.listingId);
        const filepath = LISTING_IMAGE_UPLOADS_PATH + req.body.listingId + '/';
        fs.mkdir(filepath, () => {
            cb(null, filepath);
        });
    },
    filename: function (req, file, cb) {
        console.log('hello');
        console.log('filename body: ', req.body.listingId);
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, (req.body.listingId + '-' + Date.now() + ext));
    }
});

const uploads = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024  // 2 MB
    }
}).array('images', MAX_LISTING_IMAGES);

function imagesUploadCallback(req, res, err) {
    if (err instanceof multer.MulterError) {
        res.status(403).json({err});
    } else if (err) {
        res.status(403).json({err});
    } else if (!req.files) {
        res.status(403).json({err: 'No file to upload'});
    } else {
        res.status(200).json({success: true, images: getListingImages(req.body.listingId)});
    }
}

function uploadEditedListingImages(req, res, next) {
    const numUploadImages = getListingImages(req.query.listingId).length;
    const maxNumImagesThatCanBeUploaded = MAX_LISTING_IMAGES - numUploadImages;

    const editImageUploads = multer({
        storage,
        limits: {
            fileSize: 2 * 1024 * 1024
        }
    }).array('images', maxNumImagesThatCanBeUploaded);

    editImageUploads(req, res, err => imagesUploadCallback(req, res, err));
}

function uploadListingImages (req, res) {
    uploads(req, res, (err) => imagesUploadCallback(req, res, err));
}

function deleteListingImages(req, res) {
    try {
        // delete removed images
        const imagesToRemove = req.body.deletedImages;
        for (let i = 0; i < imagesToRemove.length; i++) {
            const fullFilepath = 'server/public/' + imagesToRemove[i];
            fs.unlinkSync(fullFilepath);
        }
        res.status(200).json({ success: true, images: getListingImages(req.body.listingId) });
    }
    catch (err) {
        res.status(500).json({ success: false, err });
    }
}

module.exports = {
    updateListing,
    uploadListingImages,
    uploadEditedListingImages,
    deleteListingImages
}
