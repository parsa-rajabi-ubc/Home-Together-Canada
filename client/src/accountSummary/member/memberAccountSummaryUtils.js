/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.02.01
 *
 * @Description: Utils for member account summary
 *
 */

import {STATUSES} from "../../common/constants/memberConstants";

export const memberHasCoupleStatus = status => {
    return status === STATUSES.COUPLE || status === STATUSES.COUPLE_WITH_CHILDREN;
}

export const memberHasExistingGroupStatus = status => {
    return status === STATUSES.EXISTING_GROUP;
}