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
            type: DataTypes.STRING(100),
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
            type: DataTypes.STRING(16),
            allowNull: false
        },
        businessCellPhoneNumber: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        isNationWide: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mapAddressLine1: {
            type: DataTypes.STRING(100)
        },
        mapAddressLine2: {
            type: DataTypes.STRING(100)
        },
        mapCity: {
            type: DataTypes.STRING(60)
        },
        mapProvince: {
            type: DataTypes.STRING(4)
        },
        mapPostalCode: {
            type: DataTypes.STRING(6)
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

