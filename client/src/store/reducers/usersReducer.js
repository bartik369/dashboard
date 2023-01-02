import {
    CREATE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_USER,
    GET_USERS,

} from "../types/typesUsers";

const initialState = {
    users: [],
    user: null,
    isAuth: false,
    accessToken: null,
    loading: true,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CREATE_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                accessToken: action.payload.accessToken,
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isAuth: false,
            }
        default:
            return state;
    }
};

export default usersReducer;