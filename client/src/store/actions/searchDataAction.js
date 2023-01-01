import { SET_SEARCH_QUERY, DELETE_SEARCH_QUERY } from "../types/typesSearchData";

const setQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query,
});

const deleteQuery = () => ({
    type: DELETE_SEARCH_QUERY,
})

export const setSearchQuery = (query) => {
    console.log(query)
    return function(dispatch) {
        try {
            dispatch(setQuery(query))
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteSearchQuery = () => {

    return function(dispatch) {
        try {
            dispatch(deleteQuery())
        } catch (error) {
            console.log(error)
        }
    }
}