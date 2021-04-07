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
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverUsername: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        }
    });
}