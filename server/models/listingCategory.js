/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.18
 *
 * @Description: model for Abstract User
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define('ListingCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isClassified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
}
