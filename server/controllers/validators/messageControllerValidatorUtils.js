/**
 * @Author:     Alex Qin
 * @Created:    2021.03.23
 *
 * @Description: custom validators to validate input to controller functions to send a message
 *
 */

const memberAccountController = require('../memberAccountController');

const uidShouldExistAndBeForAMember = (uid) => {
    return memberAccountController.findMemberAccountByUid(uid)
        .then(member => {
            if (!member) {
                return Promise.reject(`That member's id does not exist`);
            }
        });
}

module.exports = {
    uidShouldExistAndBeForAMember
}