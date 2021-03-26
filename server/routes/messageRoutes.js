/**
 * @Author:     Jeff Hatton
 * @Created:    2020.03.16
 *
 * @Description: All routes for requests related to member messages
 *
 */

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');
const { isLoggedIn, userIsMember } = require('./routeUtils');
const message = require('../controllers/messagesController');
const messageValidator = require('../controllers/validators/messageControllerValidator');


router.post('/create/',
    isLoggedIn,
    userIsMember,
    messageValidator.validate('checkMessage'),
    function (req, res){
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(202).json({ errors: errors.array()});
        } else {
            message.createMessage(req)
                .then( response => res.json({...response}));
        }
    }
);

module.exports = router;