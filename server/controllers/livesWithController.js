/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for Lives With model
 *
 */

const { QueryTypes } = require('sequelize');

const db = require("../models");
const LivesWith = db.livesWith;

const findAllRoommates = (req, res) => {
    LivesWith.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while getting all roomates"
        }));
}

const findMemberRoommatesInfo = (uid) => {
    // was unable to perform query using sequelize functions
    return db.sequelize.query(
        'SELECT MemberAccountUid, RoommateUid, username as ?' +
        'FROM LivesWiths JOIN AbstractUsers ON LivesWiths.RoommateUid = AbstractUsers.uid ' +
        'WHERE MemberAccountUid = ?',
        {
            replacements: ['roommateUsername', uid],
            type: QueryTypes.SELECT
        }
    )
}

const deleteAllOfAMembersRoommate = uid => {
    return LivesWith.destroy({
        where: {
            MemberAccountUid: uid
        }
    })
}

module.exports = {
    findAllRoommates,
    findMemberRoommatesInfo,
    deleteAllOfAMembersRoommate
}
