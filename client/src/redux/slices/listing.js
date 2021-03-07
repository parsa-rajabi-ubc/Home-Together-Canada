/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.06
 *
 * @Description: slice with reducers and actions for listings
 *
 */

import { createSlice } from '@reduxjs/toolkit';

const listing = createSlice({
    name: 'listings',
    initialState: {
        serviceListingsSearchFilters: {},
        serviceListingsSearchResults: undefined,
        classifiedListingsSearchFilters: {},
        classifiedListingsSearchResults: undefined
    },
    reducers: {
        setServiceListingsSearchFilters(state, action) {
            const { serviceListingsSearchFilters } = action.payload;
            state.serviceListingsSearchFilters = { ...serviceListingsSearchFilters };
        },
        setServiceListingsSearchResults(state, action) {
            const { serviceListingsSearchResults } = action.payload;
            state.serviceListingsSearchResults = serviceListingsSearchResults;
        },
        setClassifiedListingsSearchFilters(state, action) {
            const { classifiedListingsSearchFilters } = action.payload;
            state.classifiedListingsSearchFilters = { ...classifiedListingsSearchFilters };
        },
        setClassifiedListingsSearchResults(state, action) {
            const { classifiedListingsSearchResults } = action.payload;
            state.classifiedListingsSearchResults = classifiedListingsSearchResults;
        }
    }
});

export const {
    setServiceListingsSearchFilters,
    setServiceListingsSearchResults,
    setClassifiedListingsSearchFilters,
    setClassifiedListingsSearchResults
} = listing.actions;

export default listing.reducer;
