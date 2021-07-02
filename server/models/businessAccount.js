/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: model for Business Account
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define("BusinessAccount", {
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING
        },
        isIncorporated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        incorporatedOwnersNames: {
            type: DataTypes.STRING
        },
        businessPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        businessCellPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isNationWide: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mapAddressLine1: {
            type: DataTypes.STRING
        },
        mapAddressLine2: {
            type: DataTypes.STRING
        },
        mapCity: {
            type: DataTypes.STRING
        },
        mapProvince: {
            type: DataTypes.STRING
        },
        mapPostalCode: {
            type: DataTypes.STRING
        },
        mapLatitude: {
            type: DataTypes.DECIMAL(10,7)   // 10 total digits, 7 digit decimal accuracy
        },
        mapLongitude: {
            type: DataTypes.DECIMAL(10,7)
        },
        website: {
            type: DataTypes.STRING
        }
    });
}

