/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.29
 *
 * @Description: utility function to deal with statuses and status changes
 *
 */

const get = require('lodash/get');
const includes = require('lodash/includes');
const difference = require('lodash/difference');
const {STATUS} = require('../../constants/memberConstants');

const isStatusWithRoommates = status => {
    return includes([STATUS.COUPLE, STATUS.COUPLE_WITH_CHILDREN, STATUS.EXISTING_GROUP], status);
}

const hasPartnerChanged = (partnerUsername, memberRoommates) => {
    // member does not have partner username linked to their account and is not adding a partner's username
    if (!partnerUsername && !memberRoommates.length) {
        return false;
    }

    return !includes(getRoommatesUsernames(memberRoommates), partnerUsername);
}

const haveGroupMembersChanged = (existingGroupUsernames, memberRoommates) => {
    // member does not have any group member usernames linked to their account and they are not adding any
    if (!existingGroupUsernames && !!memberRoommates.length) {
        return true;
    }
    if ((!existingGroupUsernames || !existingGroupUsernames.length) && !memberRoommates.length) {
        return false;
    }

    // checks to see if there are any differences between the list of found usernames and usernames provided
    return !!difference(existingGroupUsernames, getRoommatesUsernames(memberRoommates)).length
}

const getRoommatesUsernames = memberRoommates => {
    if (!memberRoommates) {
        return [];
    }

    return memberRoommates.map(
        roommate => get(roommate, 'roommateUsername', undefined)
    );
}

const memberHasCoupleStatus = (status) => {
    return status === STATUS.COUPLE || status === STATUS.COUPLE_WITH_CHILDREN;
}

const memberHasExistingGroupStatus = status => {
    return status === STATUS.EXISTING_GROUP;
}

module.exports = {
    isStatusWithRoommates,
    hasPartnerChanged,
    memberHasCoupleStatus,
    memberHasExistingGroupStatus,
    haveGroupMembersChanged,
    getRoommatesUsernames
}
