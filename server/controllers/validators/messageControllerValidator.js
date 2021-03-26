/**
 * @Author:     Alex Qin
 * @Created:    2021.03.23
 *
 * @Description: functions to validate input to controller functions to send a message
 *
 */

const { body } = require('express-validator/check');
const {
    isValidMessage,
    uidShouldExistAndBeForAMember
} = require('./messageControllerValidatorUtils');

const messageContentValidation = [
    body('content', "A message must be provided")
        .exists()
        .custom(content => isValidMessage(content)),
    body('receiverId',"ReceiverId must be a user")
        .exists()
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