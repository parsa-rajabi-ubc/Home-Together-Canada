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
        memberSearchFilters: {},
        memberSearchResults: undefined
    },
    reducers: {
        setActive(state, action) {
            const { active } = action.payload;
            state.active = active;
        },
        setMemberSearchFilters(state, action) {
            const { memberSearchFilters } = action.payload;
            state.memberSearchFilters = {...memberSearchFilters};
        },
        setMemberSearchResults(state, action) {
            const { memberSearchResults } = action.payload;
            state.memberSearchResults = memberSearchResults;
        }
    }
});

export const {
    setActive,
    setMemberSearchFilters,
    setMemberSearchResults
} = memberPrivilegesSlice.actions;

export default memberPrivilegesSlice.reducer;
