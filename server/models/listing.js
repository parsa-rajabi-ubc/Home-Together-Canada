/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.18
 *
 * @Description: model for listing
 *
 */
// id and createdAt fields automatically added by sequelize
module.exports = (DataTypes, sequelize) => {
    return sequelize.define('Listing', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // stringified JSON object with all listing fields
        fields: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        dateExpired: {
            type: DataTypes.DATE
        },
        dateAdminApproved: {
            type: DataTypes.DATE
        },
        isClassified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        orderId: {
            type: DataTypes.STRING
        }
    });
}
