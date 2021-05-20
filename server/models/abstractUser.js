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
            type: DataTypes.STRING(50),
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
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(16),
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
            type: DataTypes.STRING(100),
            allowNull: false
        },
        addressLine2: {
            type: DataTypes.STRING(100)
        },
        city: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        province: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        postalCode: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        hasDifferentMailingAddress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mailingAddressLine1: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        mailingAddressLine2: {
            type: DataTypes.STRING(100)
        },
        mailingCity: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        mailingProvince: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        mailingPostalCode: {
            type: DataTypes.STRING(6),
            allowNull: false
        }
    });
    return AbstractUser;
}

