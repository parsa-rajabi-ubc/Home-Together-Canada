/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.22
 *
 * @Description: model for Member Account
 *
 */

const { MEMBER_FIELD_LENGTHS } = require('../constants/fieldLengthsConstants');

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
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.DEACTIVATION_REASON)
        },
        gender: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.GENDER),
            allowNull: false
        },
        genderDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.GENDER_DESCRIPTION),
        },
        birthYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
          type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.STATUS),
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
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.HAS_HOME_TO_SHARE_DESCRIPTION)
        },
        isInterestedInBuyingHome: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        interestInBuyingHomeDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.INTERESTED_IN_BUYING_HOME_DESCRIPTION)
        },
        isReligionImportant: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        religionDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.RELIGION_DESCRIPTION)
        },
        isDietImportant: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        dietDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.DIET_DESCRIPTION)
        },
        hasHealthMobilityIssues: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        healthMobilityIssuesDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.HEALTH_MOBILITY_DESCRIPTION)
        },
        hasAllergies: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        allergiesDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.ALLERGIES_DESCRIPTION)
        },
        hasPets: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        petsDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.PETS_DESCRIPTION)
        },
        isSmoker: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        smokingDescription: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.SMOKING_DESCRIPTION)
        },
        numRoommates: {                  // -1 means any number
            type: DataTypes.INTEGER,
            allowNull: false
        },
        workStatus: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.WORK_STATUS),
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING(MEMBER_FIELD_LENGTHS.BIO)
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
