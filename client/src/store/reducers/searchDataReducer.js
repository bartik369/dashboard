import { DELETE_SEARCH_QUERY, SET_SEARCH_QUERY } from "../types/typesSearchData";

const initialState = {
    seqrchQuery: "",
};

const searchDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                query: action.payload,
            };
        case DELETE_SEARCH_QUERY:
            return {
                ...state,
                query: "",
            }
        default:
            return state
    }
};

export default searchDataReducer;