import {
    CREATE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_USER,
    GET_USERS,

} from "../types/typesUsers";

const initialState = {
    users: [],
    auth: {
        user: null,
        isAuth: false,
        accessToken: null,
    },
    userInfo: {
        description: null,
        city: null,
        birthday: null,
        phone: null,
        work: {
            departament: null,
            phone: null,
            vocation: null,
        },
        avatar: null,
    },
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

        case LOGIN_USER:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    user: action.payload,
                    isAuth: true,
                    accessToken: action.payload.accessToken,
                }
            }

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
        case LOGOUT_USER:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    user: null,
                    isAuth: false,
                    accessToken: null,
                }
            }
        default:
            return state;
    }
};

export default usersReducer;