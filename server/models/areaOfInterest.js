/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.22
 *
 * @Description: model for Area of Interest for where members would like to live
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define('AreaOfInterest', {
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        // stringified GeoJSON object
        feature: {
            type: DataTypes.TEXT,   // unlimited characters
            allowNull: false
        }
    })
}
