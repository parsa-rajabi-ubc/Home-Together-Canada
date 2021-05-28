/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: model for Abstract User
 *
 */

const { ABSTRACT_USER_FIELD_LENGTHS } = require('../constants/fieldLengthsConstants');

// the fields createdAt and updatedAt are added to every model by sequelize and are automatically managed
module.exports = (DataTypes, sequelize) => {
    const AbstractUser = sequelize.define("AbstractUser", {
        uid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.USERNAME),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.PASSWORD),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.EMAIL),
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.FIRST_NAME),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.LAST_NAME),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.PHONE_NUMBER),
            allowNull: false
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        authToken: {
            type: DataTypes.STRING,
        },
        addressLine1: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.ADDRESS_LINE_1),
            allowNull: false
        },
        addressLine2: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.ADDRESS_LINE_2)
        },
        city: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.CITY),
            allowNull: false
        },
        province: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.PROVINCE),
            allowNull: false
        },
        postalCode: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.POSTAL_CODE),
            allowNull: false
        },
        hasDifferentMailingAddress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mailingAddressLine1: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.MAILING_ADDRESS_LINE_1),
            allowNull: false
        },
        mailingAddressLine2: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.MAILING_ADDRESS_LINE_2)
        },
        mailingCity: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.MAILING_CITY),
            allowNull: false
        },
        mailingProvince: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.MAILING_PROVINCE),
            allowNull: false
        },
        mailingPostalCode: {
            type: DataTypes.STRING(ABSTRACT_USER_FIELD_LENGTHS.MAILING_POSTAL_CODE),
            allowNull: false
        }
    });
    return AbstractUser;
}

