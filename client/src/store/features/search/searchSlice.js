import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: "",
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            const { searchQuery } = action.payload;
            state.searchQuery = searchQuery
        },
        deleteSearchQuery: (state, action) => {
            state.searchQuery = '';
        },
    }
})

export default searchSlice;
export const { setSearchQuery, deleteSearchQuery } = searchSlice.actions;
export const selectSearchQuery = (state) => state.search.searchQuery;