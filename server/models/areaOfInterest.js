/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.22
 *
 * @Description: model for Area of Interest for where members would like to live
 *
 */

// TODO: add fields for latitude and longitude
module.exports = (DataTypes, sequelize) => {
    return sequelize.define('AreaOfInterest', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}
