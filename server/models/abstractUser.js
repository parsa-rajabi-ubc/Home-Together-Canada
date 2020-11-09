/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: model for Abstract User
 *
 */

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
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
            allowNull: false
        },
        addressLine2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hasDifferentMailingAddress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mailingAddressLine1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mailingAddressLine2: {
            type: DataTypes.STRING
        },
        mailingCity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mailingProvince: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mailingPostalCode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return AbstractUser;
}

