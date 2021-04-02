/**
 * @Author:     Alex Qin
 * @Created:    2021.03.23
 *
 * @Description: functions to validate input to controller functions to send a message
 *
 */

const { body } = require('express-validator/check');
const {uidShouldExistAndBeForAMember} = require('./messageControllerValidatorUtils');

const messageContentValidation = [
    body('content', "A message must be provided")
        .exists()
        .trim()
        .stripLow()
        .isString()
        .not().isEmpty(),
    body('receiverId',"ReceiverId must be a user")
        .exists()
        .isNumeric()
        .custom(receiverId => uidShouldExistAndBeForAMember(receiverId)),
];



exports.validate = (method) => {
    switch (method) {
        case 'checkMessage': {
            return [
                ...messageContentValidation
            ]
        }
    }
}