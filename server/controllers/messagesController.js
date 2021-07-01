/**
 * @Author:     Jeff Hatton
 * @Created:    2020.03.17
 *
 * @Description: controller functions for messages model
 *
 */

const db = require('../models');
const {Op} = require("sequelize");

const Message = db.message;
const memberController = require('./memberAccountController');

const createMessage = (req) => {
    const messageEntry = {
        senderId: req.user.uid,
        senderUsername:req.user.username,
        receiverId: req.body.receiverId,
        receiverUsername: req.body.receiverUsername,
        content: req.body.content
    }

    return Message.create(messageEntry);
}

const findMessagesForUser = async uid => {
    const allMessages = await Message.findAll({
        where: {
            [Op.or]: [
                {senderId: uid},
                {receiverId: uid}
            ]
        }
    });

    return allMessages.map(message => {
        return {
            ...message.dataValues
        }
    });
}

const findAllMessagesForAllUsers = (req, res) => {
    Message.findAll({include: { all: true }})
        .then(message => res.status(200).json({ message }))
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong getting messages"})
        });
}

module.exports = {
    createMessage,
    findMessagesForUser,
    findAllMessagesForAllUsers
}