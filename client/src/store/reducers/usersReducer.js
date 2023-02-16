import {
    CREATE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_USER,
    GET_USERS,
    GET_PROFILE_INFO,

} from "../types/typesUsers";

const initialState = {
    users: [],
    auth: {
        user: null,
        isAuth: false,
        accessToken: null,
    },
    profile: {
        description: "",
        city: "",
        birthday: "",
        phone: "",
        work: {
            departament: "",
            workPhone: "",
            vocation: "",
        },
        avatar: "",
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
                },
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
                },
                profile: null,

            }
        case GET_PROFILE_INFO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    description: action.payload.description,
                    city: action.payload.city,
                    birthday: action.payload.birthday,
                    phone: action.payload.phone,
                    work: {
                        departament: action.payload.work.departament,
                        workPhone: action.payload.work.workPhone,
                        vocation: action.payload.work.vocation,
                    },
                    avatar: action.payload.avatar,
                }
            }
        default:
            return state;
    }
};

export default usersReducer;