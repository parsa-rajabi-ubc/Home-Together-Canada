/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for MemberAccount model
 *
 */
const { Op } = require("sequelize");
const has = require('lodash/has');

const db = require('../models');
const MemberAccount = db.memberAccount;
const AbstractUser = db.abstractUser;

const createMemberAccount = (req, uid) => {

    // TODO: add preference fields when implementing search filters
    const memberAccount = {
        uid: uid,
        isAdmin: false, // an account should be given admin privileges after its creation
        gender: req.body.gender,
        genderDescription: req.body.genderDescription,
        birthYear: req.body.birthYear,
        status: req.body.status,
        minMonthlyBudget: req.body.minMonthlyBudget,
        maxMonthlyBudget: req.body.maxMonthlyBudget,
        hasHomeToShare: req.body.hasHomeToShare,
        homeToShareDescription: req.body.homeToShareDescription,
        isReligionImportant: req.body.isReligionImportant,
        religionDescription: req.body.religionDescription,
        isDietImportant: req.body.isDietImportant,
        dietDescription: req.body.dietDescription,
        hasHealthMobilityIssues: req.body.hasHealthMobilityIssues,
        healthMobilityIssuesDescription: req.body.healthMobilityIssuesDescription,
        hasAllergies: req.body.hasAllergies,
        allergiesDescription: req.body.allergiesDescription,
        hasPets: req.body.hasPets,
        petsDescription: req.body.petsDescription,
        isSmoker: req.body.isSmoker,
        smokingDescription: req.body.smokingDescription,
        numRoommates: req.body.numRoommates,
        workStatus: req.body.workStatus,
        bio: req.body.bio,
        minAgePreference: req.body.minAgePreference,
        maxAgePreference: req.body.maxAgePreference,
        minBudgetPreference: req.body.minBudgetPreference,
        maxBudgetPreference: req.body.maxBudgetPreference,
        statusPreference: JSON.stringify(req.body.statusPreference),
        numRoommatesPreference: JSON.stringify(req.body.numRoommatesPreference),
        dietPreference: req.body.dietPreference,
        petsPreference: req.body.petsPreference,
        smokingPreference: req.body.smokingPreference,
        genderPreference: JSON.stringify(req.body.genderPreference),
        religionPreference: req.body.religionPreference,
        othersWithHomeToSharePreference: req.body.othersWithHomeToSharePreference
    }

    return MemberAccount.create(memberAccount);
}

const findAllMemberAccounts = (req, res) => {
    MemberAccount.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

const findMemberAccountByUsername = (username) => {
    return MemberAccount.findAll({
        include: [
            {
                model: AbstractUser,
                where: {
                    username: username
                }
            }
        ]
    })
}

const findMemberAccountByUid = uid => {
    return MemberAccount.findByPk(uid);
}

const getMemberProfilesMatchingSearchFilters = (uid, searchFilters) => {
    let query = {
        where: {
            // do not include user doing the search in the results
            uid: {
                [Op.not]: uid
            },
            // admins will not be shown in search results
            isAdmin: {
                [Op.eq]: false
            }
        }
    }

    /*
    Filters are optional, so we only add them if they are present
     */

    if (has(searchFilters, 'maxAgePreference') && has(searchFilters, 'minAgePreference')) {
        query.where.birthYear = {
            // Note: this is INCLUSIVE
            [Op.between]: [
                // get year of birth
                new Date().getFullYear() - searchFilters.maxAgePreference,
                new Date().getFullYear() - searchFilters.minAgePreference
            ]
        }
    }

    if(has(searchFilters, 'maxBudgetPreference') && has(searchFilters, 'minBudgetPreference')) {
        // determine if profile's budget range overlaps with preference budget range.
        // See https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-two-integer-ranges-for-overlap
        query.where = {
            ...query.where,
            [Op.and]: [{
                minMonthlyBudget: {
                    [Op.lte]: searchFilters.maxBudgetPreference
                },
                maxMonthlyBudget: {
                    [Op.gte]: searchFilters.minBudgetPreference
                }
            }]
        }
    }

    if(has(searchFilters, 'statusPreference')) {
        // status is in array of statusPreference
        query.where.status = searchFilters.statusPreference;
    }

    if(has(searchFilters, 'genderPreference')) {
        // gender is in array of genderPreference
        query.where.gender = searchFilters.genderPreference;
    }

    if (has(searchFilters, 'petsPreference')) {
        query.where.hasPets = searchFilters.petsPreference;
    }

    if (has(searchFilters, 'smokingPreference')) {
        query.where.isSmoker = searchFilters.smokingPreference;
    }

    if (has(searchFilters, 'religionPreference')) {
        query.where.isReligionImportant = searchFilters.religionPreference;
    }

    if (has(searchFilters, 'dietPreference')) {
        query.where.isDietImportant = searchFilters.dietPreference;
    }

    if (has(searchFilters, 'othersWithHomeToSharePreference')) {
        query.where.hasHomeToShare = searchFilters.othersWithHomeToSharePreference;
    }

    // if numRoommatesPreference contains -1, it will ONLY contain -1 (ie. [-1])
    if(has(searchFilters, 'numRoommatesPreference') && searchFilters.numRoommatesPreference[0] !== -1){
        query.where.numRoommates = {
            [Op.or]: {
                [Op.eq]: -1,
                [Op.in]: searchFilters.numRoommatesPreference,
            }
        }
    }


    return MemberAccount.findAll({
        where: {...query.where},
        include: {
            model: AbstractUser,
            attributes: ['username']
        }
    });
}

module.exports = {
    createMemberAccount,
    findAllMemberAccounts,
    findMemberAccountByUsername,
    findMemberAccountByUid,
    getMemberProfilesMatchingSearchFilters
}
