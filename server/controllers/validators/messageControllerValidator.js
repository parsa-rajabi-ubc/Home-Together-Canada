/**
 * @Author:     Alex Qin
 * @Created:    2021.03.23
 *
 * @Description: functions to validate input to controller functions to send a message
 *
 */

const { body } = require('express-validator/check');
const {uidShouldExistAndBeForAMember} = require('./messageControllerValidatorUtils');
const {usernameShouldExistAndBeAMember, isValidStringLength} = require('./userControllerValidatorUtils');
const { MESSAGE_FIELD_LENGTHS } = require('../../constants/fieldLengthsConstants');

const messageContentValidation = [
    body('content', "A message must be provided")
        .exists()
        .trim()
        .stripLow()
        .isString()
        .not().isEmpty()
        .custom(content => isValidStringLength(
            content,
            MESSAGE_FIELD_LENGTHS.CONTENT,
            'Message content'
        )),
    body('receiverId',"ReceiverId must be a user")
        .exists()
        .isNumeric()
        .custom(receiverId => uidShouldExistAndBeForAMember(receiverId)),
    body('receiverUsername',"ReceiverUsername must be a user")
        .exists()
        .isString()
        .custom(username => usernameShouldExistAndBeAMember(username))
        .custom(username => isValidStringLength(
            username,
            MESSAGE_FIELD_LENGTHS.RECEIVER_USERNAME,
            'Receiver username'
        ))
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