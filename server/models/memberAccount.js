/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.22
 *
 * @Description: model for Member Account
 *
 */

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
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        deactivationReason: {
            type: DataTypes.STRING(100)
        },
        gender: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        genderDescription: {
            type: DataTypes.STRING(100),
        },
        birthYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
          type: DataTypes.STRING(100),
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
            type: DataTypes.STRING(100)
        },
        isInterestedInBuyingHome: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        interestInBuyingHomeDescription: {
            type: DataTypes.STRING(100)
        },
        isReligionImportant: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        religionDescription: {
            type: DataTypes.STRING(100)
        },
        isDietImportant: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        dietDescription: {
            type: DataTypes.STRING(100)
        },
        hasHealthMobilityIssues: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        healthMobilityIssuesDescription: {
            type: DataTypes.STRING(100)
        },
        hasAllergies: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        allergiesDescription: {
            type: DataTypes.STRING(100)
        },
        hasPets: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        petsDescription: {
            type: DataTypes.STRING(100)
        },
        isSmoker: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        smokingDescription: {
            type: DataTypes.STRING(100)
        },
        numRoommates: {                  // -1 means any number
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workStatus: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING(2000)
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
            type: DataTypes.STRING(1000), // stringified array
            allowNull: false
        },
        numRoommatesPreference: {
            type: DataTypes.STRING(50), // stringified array, -1 means any number
            allowNull: false
        },
        minBudgetPreference: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        maxBudgetPreference: {
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
        genderPreference: {
            type: DataTypes.STRING(400),     // stringified array
            allowNull: false
        },
        religionPreference: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        othersWithHomeToSharePreference: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
}
