/**
 * @Author:     Alex Qin
 * @Created:    2021.03.23
 *
 * @Description: custom validators to validate input to controller functions to send a message
 *
 */

const isValidMessage = (message) =>{
        //is string blank, empty, null, undefined, whitespace
        if (typeof message.content === 'undefined' || !message.content || message.content.length === 0 || message.content === "" || !/[^\s]/.test(message.content) || /^\s*$/.test(message.content))
            return false;
        else if (typeof message.content === 'string' && message.content.replace(/\s/g,"") === "") {
            return false;
        }
        else
            return true;
}

module.exports = {
    isValidMessage
}