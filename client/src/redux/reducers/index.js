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

export default combineReducers({
    userPrivileges: userPrivilegesReducer,
    memberPrivileges: memberPrivilegesReducer
});
