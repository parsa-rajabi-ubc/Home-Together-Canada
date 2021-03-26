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
            message.createMessage(req,req.user.uid)
                .then( (message) => res.status(200).json({
                    senderId: message.senderId,
                    receiverId:message.receiverId,
                    content: message.content,
                }))
                .catch(err => {
                    res.status(500).json({ err: err.message });
                });
        }
    }
);

router.get('/allUserMessages/',
    isLoggedIn,
    userIsMember,
    function (req, res){
        message.findAllMessagesForAllUsers(req,res);
    }
);

router.get('/oneUserMessages/',
    isLoggedIn,
    userIsMember,
    function (req, res){
        message.findMessagesForUser(req.user.uid)
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({ message: err.message || "Something went wrong getting messages"})
            });
    }
);

module.exports = router;