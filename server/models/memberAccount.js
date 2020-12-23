/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.22
 *
 * @Description: model for Member Account
 *
 */

// TODO: when implementing search filters, all preference fields show have allowNull: false property
module.exports = (DataTypes, sequelize) => {
    return sequelize.define('MemberAccount', {
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genderDescription: {
            type: DataTypes.INTEGER,
        },
        birthYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        minMonthlyBudget: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maxMonthlyBudget: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hasHomeToShare: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        homeToShareDescription: {
            type: DataTypes.STRING
        },
        isReligionImportant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        religionDescription: {
            type: DataTypes.STRING
        },
        isDietImportant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dietDescription: {
            type: DataTypes.STRING
        },
        hasHealthMobilityIssues: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        healthMobilityIssuesDescription: {
            type: DataTypes.STRING
        },
        hasAllergies: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        allergiesDescription: {
            type: DataTypes.STRING
        },
        hasPets: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        petsDescription: {
            type: DataTypes.STRING
        },
        isSmoker: {
            type: DataTypes.STRING,
            allowNull: false
        },
        smokingDescription: {
            type: DataTypes.STRING
        },
        numRoommates: {                  // -1 means any number
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING
        },

        // PREFERENCES
        minAgePreference: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maxAgePreference: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        statusPreference: {
            type: DataTypes.STRING, // JSON of status preferences
            allowNull: false
        },
        minNumRoommatesPreference: {   // -1 means any number
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maxNumRoommatesPreference: {   // -1 means any number
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dietPreference: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        petsPreference: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        smokingPreference: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        healthAndMobilityPreference: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
}
