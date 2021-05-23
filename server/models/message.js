/**
 * @Author:     Jeff Hatton
 * @Created:    2020.03.15
 *
 * @Description: model for a member's messages
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define("Message", {
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        senderUsername: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverUsername: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        }
    });
}