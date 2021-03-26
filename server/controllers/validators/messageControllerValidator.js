/**
 * @Author:     Alex Qin
 * @Created:    2021.03.23
 *
 * @Description: functions to validate input to controller functions to send a message
 *
 */
import {isStringEmpty} from "../../../client/src/common/utils/stringUtils";

const { body } = require('express-validator/check');
// const {
//     isValidMessage
// } = require('./messageControllerValidatorUtils');

const { userIsMember } = require('../../routes/routeUtils');

const messageContentValidation = [
    body('content', "A message must be provided")
        .exists()
        .custom(content => isStringEmpty(content)),
    body('receiverId',"ReceiverId must be a user")
        .exists()
        .custom(receiverId => userIsMember(receiverId)),
];

exports.validate = (method) =>{
    switch (method) {
        case 'checkMessage': {
            return [
                ...messageContentValidation
            ]
        }
    }
}