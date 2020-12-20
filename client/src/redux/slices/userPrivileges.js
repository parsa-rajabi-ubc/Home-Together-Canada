/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.19
 *
 * @Description: slice with reducers and actions for user privileges
 *
 * Tutorials used: https://www.valentinog.com/blog/redux/ & https://redux-toolkit.js.org/tutorials/intermediate-tutorial
 *
 */

import { createSlice } from '@reduxjs/toolkit';

const userPrivilegesSlice = createSlice({
    name: 'privileges',
    initialState: {
        isAdmin: false,
        accountType: null,
        authenticated: null
    },
    reducers: {
        setIsAdmin(state, action) {
            const { isAdmin } = action.payload;
            state.isAdmin = isAdmin;
        },
        setAccountType(state, action) {
            const { accountType } = action.payload;
            state.accountType = accountType;
        },
        setAuthenticated(state, action) {
            const { authenticated } = action.payload;
            state.authenticated = authenticated;
        }
    }
});

export const {
    setIsAdmin,
    setAccountType,
    setAuthenticated
} = userPrivilegesSlice.actions;

export default userPrivilegesSlice.reducer;
