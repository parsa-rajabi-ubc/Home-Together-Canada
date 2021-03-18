/**
 * @Author:     Jeff Hatton
 * @Created:    2020.03.17
 *
 * @Description: controller functions for messages model
 *
 */

const db = require('../models');
const Message = db.message;

const createMessage = async (message, uid) => {

    const messageEntry = {
        uid: uid,
        dateSent: message.dateSent,
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content
    }

    return Message.create(messageEntry);
}

const findMessagesForUser = uid => {
    return Message.findAll({
        where: {
            uid: uid
        }
    });
}
const findAllMessagesForAllUsers = (req, res) => {
    Message.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong getting messages"})
        });
}

module.exports = {
    createMessage,
    findMessagesForUser,
    findAllMessagesForAllUsers
}