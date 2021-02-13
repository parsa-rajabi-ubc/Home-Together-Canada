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
        active: null
    },
    reducers: {
        setActive(state, action) {
            const { active } = action.payload;
            state.active = active;
        }
    }
});

export const {
    setActive
} = memberPrivilegesSlice.actions;

export default memberPrivilegesSlice.reducer;
