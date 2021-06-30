/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.19
 *
 * @Description: root reducer for redux store
 *
 */

import { combineReducers } from 'redux';

import userPrivilegesReducer from '../slices/userPrivileges';
import memberPrivilegesReducer from '../slices/memberPrivileges';
import listingsReducer from '../slices/listing';
import {USER_TYPES} from "../../common/constants/users";

const allReducers = combineReducers({
    userPrivileges: userPrivilegesReducer,
    memberPrivileges: memberPrivilegesReducer,
    listings: listingsReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
        state = {
            userPrivileges: {
                isAdmin: false,
                accountType: USER_TYPES.UNREGISTERED,
                authenticated: false
            },
            memberPrivileges: {
                active: null,
                memberSearchFilters: {},
                memberSearchResults: undefined
            },
            listings: {
                serviceListingsSearchFilters: {},
                serviceListingsSearchResults: undefined,
                classifiedListingsSearchFilters: {},
                classifiedListingsSearchResults: undefined
            }
        }
    }
    return allReducers(state, action);
}

export default rootReducer;
