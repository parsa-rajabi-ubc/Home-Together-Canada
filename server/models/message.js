/**
 * @Author:     Jeff Hatton
 * @Created:    2020.03.15
 *
 * @Description: model for a member's messages
 *
 */

const { MESSAGE_FIELD_LENGTHS } = require('../constants/fieldLengthsConstants');

module.exports = (DataTypes, sequelize) => {
    return sequelize.define("Message", {
        senderId: {
            type: DataTypes.INTEGER,
        },
        senderUsername: {
            type: DataTypes.STRING(MESSAGE_FIELD_LENGTHS.SENDER_USERNAME),
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
        },
        receiverUsername: {
            type: DataTypes.STRING(MESSAGE_FIELD_LENGTHS.RECEIVER_USERNAME),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(MESSAGE_FIELD_LENGTHS.CONTENT),
            allowNull: false,
        }
    });
}