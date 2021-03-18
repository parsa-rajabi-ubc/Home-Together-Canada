/**
 * @Author:     Jeff Hatton
 * @Created:    2020.03.15
 *
 * @Description: model for a member's messages
 *
 */
module.exports = (DataTypes, sequelize) => {
    return sequelize.define("Message", {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateSent: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING
        }
    });
}