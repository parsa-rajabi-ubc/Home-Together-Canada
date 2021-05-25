/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: model for Business Account
 *
 */

const { BUSINESS_FIELD_LENGTHS } = require('../constants/fieldLengthsConstants');

module.exports = (DataTypes, sequelize) => {
    return sequelize.define("BusinessAccount", {
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        businessName: {
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.BUSINESS_NAME),
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
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.INCORPORATED_OWNERS_NAMES)
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
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.MAP_ADDRESS_LINE_1)
        },
        mapAddressLine2: {
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.MAP_ADDRESS_LINE_2)
        },
        mapCity: {
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.MAP_CITY)
        },
        mapProvince: {
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.MAP_PROVINCE)
        },
        mapPostalCode: {
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.MAP_POSTAL_CODE)
        },
        mapLatitude: {
            type: DataTypes.DECIMAL(10,7)   // 10 total digits, 7 digit decimal accuracy
        },
        mapLongitude: {
            type: DataTypes.DECIMAL(10,7)
        },
        website: {
            type: DataTypes.STRING(BUSINESS_FIELD_LENGTHS.WEBSITE)
        }
    });
}

