/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.11
 *
 * @Description: slice with reducers and actions for user privileges
 *
 *
 */

import { createSlice } from '@reduxjs/toolkit';

const memberPrivilegesSlice = createSlice({
    name: 'memberPrivileges',
    initialState: {
        active: null,
        memberSearchFilters: {}
    },
    reducers: {
        setActive(state, action) {
            const { active } = action.payload;
            state.active = active;
        },
        setMemberSearchFilters(state, action) {
            const { memberSearchFilters } = action.payload;
            state.memberSearchFilters = {...memberSearchFilters};
        }
    }
});

export const {
    setActive,
    setMemberSearchFilters
} = memberPrivilegesSlice.actions;

export default memberPrivilegesSlice.reducer;
