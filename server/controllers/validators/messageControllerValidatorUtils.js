/**
 * @Author:     Alex Qin
 * @Created:    2021.03.23
 *
 * @Description: custom validators to validate input to controller functions to send a message
 *
 */

const memberAccountController = require('../memberAccountController');

const isValidMessage = (content) =>{
        //is string blank, empty, null, undefined, whitespace
        if (typeof content === 'undefined' || !content || content.length === 0 || content === "" || !/[^\s]/.test(content) || /^\s*$/.test(content))
            throw new Error('Message cannot be shit, empty, null, undefined or whitespace');
        else if (typeof content === 'string' && content.replace(/\s/g,"") === "") {
            throw new Error('Message cannot be blank, empty, null, undefined or whitespace');
        }
        else
            return true;
}

const uidShouldExistAndBeForAMember = (uid) => {
    return memberAccountController.findMemberAccountByUid(uid)
        .then(member => {
            if (!member) {
                return Promise.reject(`That member's id does not exist`);
            }
        });
}

module.exports = {
    isValidMessage,
    uidShouldExistAndBeForAMember
}