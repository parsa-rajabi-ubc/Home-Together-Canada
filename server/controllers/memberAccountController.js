/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for MemberAccount model
 *
 */
const { Op } = require("sequelize");
const has = require('lodash/has');
const filter = require('lodash/filter');
const differenceWith = require('lodash/differenceWith');
const isEqual = require('lodash/isEqual');

const db = require('../models');
const {getValueOfOptionalField} = require("./utils/accountControllerUtils");
const MemberAccount = db.memberAccount;
const AbstractUser = db.abstractUser;
const AreaOfInterest = db.areaOfInterest;
const livesWith = require('../controllers/livesWithController');
const abstractUsers = require('../controllers/abstractUserController');
const areasOfInterest = require('../controllers/areaOfInterestController');
const {
    isStatusWithRoommates,
    hasPartnerChanged,
    memberHasCoupleStatus,
    memberHasExistingGroupStatus,
    haveGroupMembersChanged
} = require('./utils/statusUtils');
const { areasOfInterestHaveChanged, getListOfAreaOfInterestObjects } = require('./utils/areaOfInterestUtils');
const { featuresOverlap } = require('./utils/locationUtils');


const createMemberAccount = (req, uid) => {

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
        isInterestedInBuyingHome: req.body.isInterestedInBuyingHome,
        interestInBuyingHomeDescription: req.body.interestInBuyingHomeDescription,
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
    return MemberAccount.findOne({
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

const findFullMemberProfileByUsername = username => {
    return MemberAccount.findOne({
        include: [
            {
                model: AbstractUser,
                attributes: ['username'],
                where: {
                    username: username
                }
            },
            {
                model: AreaOfInterest
            },
            {
                // get usernames of all of that member's roommates
                model: MemberAccount,
                as: "Roommates",
                attributes: ['uid'],
                through: {
                    attributes: ['RoommateUid']
                },
                include: [{
                    model: AbstractUser,
                    attributes: ['username']
                }]
            }
        ]
    })
}

const findMemberAccountByUid = uid => {
    return MemberAccount.findByPk(uid);
}

const updateMemberProfile = (req, uid) => {
    const memberProfile = {
        gender: req.body.gender,
        genderDescription: getValueOfOptionalField(req.body.gender, req.body.genderDescription),
        birthYear: req.body.birthYear,
        minMonthlyBudget: req.body.minMonthlyBudget,
        maxMonthlyBudget: req.body.maxMonthlyBudget,
        hasHomeToShare: req.body.hasHomeToShare,
        hasHomeToShareDescription: getValueOfOptionalField(req.body.hasHomeToShare, req.body.hasHomeToShareDescription),
        isReligionImportant: req.body.isReligionImportant,
        religionDescription: getValueOfOptionalField(req.body.isReligionImportant, req.body.religionDescription),
        isDietImportant: req.body.isDietImportant,
        dietDescription: getValueOfOptionalField(req.body.isDietImportant, req.body.dietDescription),
        hasHealthMobilityIssues: req.body.hasHealthMobilityIssues,
        healthMobilityIssuesDescription: getValueOfOptionalField(req.body.hasHealthMobilityIssues, req.body.healthMobilityIssuesDescription),
        hasAllergies: req.body.hasAllergies,
        allergiesDescription: getValueOfOptionalField(req.body.hasAllergies, req.body.allergiesDescription),
        hasPets: req.body.hasPets,
        petsDescription: getValueOfOptionalField(req.body.hasPets, req.body.petsDescription),
        isSmoker: req.body.isSmoker,
        smokingDescription: getValueOfOptionalField(req.body.isSmoker, req.body.smokingDescription),
        numRoommates: req.body.numRoommates,
        workStatus: req.body.workStatus,
        bio: req.body.bio
    };

    return MemberAccount.update(memberProfile, {
        where: {
            uid: uid
        }
    });
}

const updateMemberStatus = (uid, status) => {
    return MemberAccount.update({
        status: status
    }, {
        where: {
            uid: uid
        }
    });
}

const activateAccount = uid =>
    MemberAccount.update({
        active: true,
        deactivationReason: null
    }, {
        where: {
            uid: uid
        }
    });

const deactivateAccount = (uid, reason) =>
    MemberAccount.update({
        active: false,
        deactivationReason: reason
    }, {
        where: {
            uid: uid
        }
    });

const updateMemberStatusAndRoommates = async (req) => {
    try {
        const uid = req.user.uid;
        const newStatus = req.body.status;

        const member = await findMemberAccountByUid(uid);
        const memberRoommates = await livesWith.findMemberRoommatesInfo(uid);

        const currentStatus = member.dataValues.status;

        // the member's status has not changed and they do not have a status that has ability to link profiles
        if (currentStatus === req.body.status && !isStatusWithRoommates(currentStatus)) {
            return { success: true };
        }
        // member has couple status, status has not changed, and linked profile has not changed
        else if (currentStatus === req.body.status && memberHasCoupleStatus(req.body.status) && !hasPartnerChanged(req.body.partnerUsername, memberRoommates)) {
            return { success: true };
        }
        // member has existing group status, status has not changed, and the linked profiles have not changed
        else if (currentStatus === req.body.status && memberHasExistingGroupStatus(req.body.status) && !haveGroupMembersChanged(req.body.existingGroupUsernames, memberRoommates)) {
            return { success: true };
        }


        // old status was a couple or existing group and there has been a change in status or linked profiles
        if (isStatusWithRoommates(currentStatus)) {

            // delete entries of linked profile from the livesWiths table
            await livesWith.deleteAllOfAMembersRoommate(uid);

            /**
             * There was a change that required an addition to the LivesWiths table
             *      - status changed to couple and has a partner usernames
             *      - status changed to existing group and has group members' usernames
             *      - couple status has not changed, but the partner's username has changed
             *      - existing group status has not changed, but the existing group members' usernames have changed
             */
            if (
                (memberHasCoupleStatus(newStatus) && req.body.partnerUsername)
                || (memberHasExistingGroupStatus(newStatus) && req.body.existingGroupUsernames)
                || (memberHasCoupleStatus(currentStatus) && req.body.partnerUsername && hasPartnerChanged(req.body.partnerUsername, memberRoommates))
                || (memberHasExistingGroupStatus(currentStatus) && req.body.existingGroupUsernames && haveGroupMembersChanged(req.body.existingGroupUsernames))
            ) {
                const roommateUsernames = memberHasExistingGroupStatus(newStatus)
                    ? req.body.existingGroupUsernames
                    : [req.body.partnerUsername];
                const roommates = await abstractUsers.findUsersByUsernames(roommateUsernames);

                roommates.forEach(roommate => {
                    member.addRoommate(roommate.dataValues.uid,
                        {
                            through: {
                                relationship: newStatus
                            }
                        }
                    )
                });
            }
        }
        // member was a non couple/EG and is now a couple/EG
        else {
            if (isStatusWithRoommates(newStatus)) {
                const roommateUsernames = memberHasExistingGroupStatus(newStatus)
                    ? req.body.existingGroupUsernames
                    : [req.body.partnerUsername];
                const roommates = await abstractUsers.findUsersByUsernames(roommateUsernames);

                roommates.forEach(roommate => {
                    member.addRoommate(roommate.dataValues.uid,
                        {
                            through: {
                                relationship: req.body.status
                            }
                        }
                    )
                });
            }
        }

        await updateMemberStatus(uid, newStatus);

        return { success: true, status: newStatus };
    }
    catch(error) {
        return { success: false, error: error.message };
    }
}

const updateMemberAreaOfInterest = async (req) => {
    try {
        const currentAreasOfInterestQueryObjects = await areasOfInterest.findAreasOfInterestForUser(req.user.uid);
        const currentAreasOfInterest = getListOfAreaOfInterestObjects(currentAreasOfInterestQueryObjects)
        const newAreasOfInterest = req.body.areasOfInterest;

        if (!areasOfInterestHaveChanged(currentAreasOfInterest, newAreasOfInterest)) {
            return { success: true };
        }

        // find AOI to remove
        const areasOfInterestToRemove = differenceWith(currentAreasOfInterest, newAreasOfInterest, isEqual);

        if (areasOfInterestToRemove) {
            areasOfInterestToRemove.forEach(areaOfInterest => {
                areasOfInterest.deleteAreaOfInterest(
                    {
                        ...areaOfInterest
                    },
                    req.user.uid
                );
            })
        }

        // identify AOI to add
        const areasOfInterestToAdd = differenceWith(newAreasOfInterest, currentAreasOfInterest, isEqual);

        if (areasOfInterestToAdd) {
            areasOfInterestToAdd.forEach(areaOfInterest => {
                areasOfInterest.createAreaOfInterest(areaOfInterest, req.user.uid);
            });
        }

        return {
            success: true,
            areasOfInterestRemoved: areasOfInterestToRemove,
            areasOfInterestAdded: areasOfInterestToAdd
        };
    }
    catch (error) {
        return { success: false, error: error.message };
    }

}

const getMemberSearchFilters = uid => {
    return MemberAccount.findOne({
        attributes: [
            'minAgePreference',
            'maxAgePreference',
            'statusPreference',
            'numRoommatesPreference',
            'minBudgetPreference',
            'maxBudgetPreference',
            'dietPreference',
            'petsPreference',
            'smokingPreference',
            'genderPreference',
            'religionPreference',
            'othersWithHomeToSharePreference'
        ],
        where: {
            uid: uid
        }
    });
}

const updateMemberSearchFilters = (uid, req) => {
    return MemberAccount.update({
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
    }, {
        where: {
            uid: uid
        }
    });
}

const getMemberProfilesMatchingSearchFilters = async (uid, searchFilters, filteringLocationFeature) => {
    let query = {
        where: {
            // do not include user doing the search in the results
            uid: {
                [Op.not]: uid
            },
            // admins will not be shown in search results
            isAdmin: {
                [Op.eq]: false
            },
            active: {
                [Op.eq]: true
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

    const profilesFilteredByPreferences = await MemberAccount.findAll({
        where: {...query.where},
        include: [
            {
                model: AbstractUser,
                attributes: ['username']
            },
            {
                model: AreaOfInterest
            },
            {
                // get usernames of all of that member's roommates
                model: MemberAccount,
                as: "Roommates",
                attributes: ['uid'],
                through: {
                    attributes: ['RoommateUid']
                },
                include: [{
                    model: AbstractUser,
                    attributes: ['username']
                }]
            }
        ]
    });

    const profilesFilteredByLocation = filter(profilesFilteredByPreferences, function (profile) {
        const areasOfInterest = profile.AreaOfInterests;

        const profileHasAreaOfInterestInRange = filter(areasOfInterest, function (areaOfInterest) {
            const areaOfInterestFeature = JSON.parse(areaOfInterest.dataValues.feature);
            return featuresOverlap(areaOfInterestFeature, filteringLocationFeature);
        });
        return !!profileHasAreaOfInterestInRange.length;
    });

    return profilesFilteredByLocation;
}

const giveAdminPrivileges = uid => {
    return MemberAccount.update({
        isAdmin: true
    }, {
        where: {
            uid: uid
        }
    });
}

const getAllAdminUsernames = () => {
    return MemberAccount.findAll({
        attributes: [],
        include: [
            {
                model: AbstractUser,
                attributes: ['username']
            }
        ],
        where: {
            isAdmin: true
        }
    });
}

module.exports = {
    createMemberAccount,
    findAllMemberAccounts,
    findMemberAccountByUsername,
    findFullMemberProfileByUsername,
    findMemberAccountByUid,
    updateMemberProfile,
    updateMemberStatus,
    updateMemberStatusAndRoommates,
    updateMemberAreaOfInterest,
    getMemberSearchFilters,
    updateMemberSearchFilters,
    getMemberProfilesMatchingSearchFilters,
    activateAccount,
    deactivateAccount,
    giveAdminPrivileges,
    getAllAdminUsernames
}
