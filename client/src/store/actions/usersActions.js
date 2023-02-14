import axios from "axios";
import ENV from "../../env.config";

import {
    GET_USER,
    GET_USERS,
    CREATE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_PROFILE_INFO,
    UPDATE_PROFILE_INFO,
} from "../types/typesUsers.js";


const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
    loading: true,
});

const getUser = (user) => ({
    type: GET_USER,
    payload: user,
});

const login = (user) => ({
    type: LOGIN_USER,
    payload: user,
});

const logout = () => ({
    type: LOGOUT_USER,
});

const addUser = () => ({
    type: CREATE_USER,
});

const updateProfile = () => ({
    type: UPDATE_PROFILE_INFO,
});

const profileInfo = () => ({
    type: GET_PROFILE_INFO,
});

export const createUser = (user, animationSignup, setError) => {
    return async function(dispatch) {
        try {
            await axios
                .post(`${ENV.HOSTNAME}api/registration`, user)
                .then((response) => {
                    dispatch(addUser(response.data));
                    animationSignup();
                });
        } catch (error) {
            console.log(error);
            const messagesRegistration = error.response.data.errors;
            messagesRegistration.map((item) => {

                if (item.email) {
                    setError("email", { type: "email", message: item.email });
                }
            });
        }
    };
}

export const loginUser = (data, setError, navigate) => {
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}api/login`, data).then((response) => {
                dispatch(login(response.data));
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.accessToken)
                );
                navigate("/dashboard")
            });
        } catch (error) {
            console.log(error);
            const messagesLogin = error.response.data.errors;
            messagesLogin.map((item) => {

                if (item.email) {
                    setError("email", { type: "email", message: item.email });
                } else if (item.password) {
                    setError("password", { type: "password", message: item.password });
                }
            });
        }
    };
}

export const logoutUser = (navigate) => {
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}api/logout`).then((response) => {
                localStorage.removeItem("token");
                dispatch(logout());
                navigate("/");
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const loadUser = (id) => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}user${id}`).then((response) => {
                dispatch(getUser(response.data));
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const loadUsers = () => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}api/users`).then((response) => {
                dispatch(getUsers(response.data));
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const updateUserPassword = (data, setError, setNotificationStatus, setFormStatus, animationSignup) => {
    console.log(data)
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}api/reset`, data)
                .then((response) => {
                    setNotificationStatus(true);
                    setFormStatus(false);
                    animationSignup()
                });
        } catch (error) {
            console.log(error);
            const messagesErrors = error.response.data.errors;
            messagesErrors.map((item) => {

                if (item.email) {
                    setError("email", { type: "email", message: item.email });
                    setNotificationStatus(false);
                    setFormStatus(true);
                }
            });

        }
    };
}

export const comparePasswordLink = (link, navigate) => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}api/setpassword/${link}`)
                .then((response) => {
                    if (!response.data) {
                        navigate("/reset-password")
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
}

export const setNewUserPassword = (data) => {
    return async function(dispatch) {
        try {
            await axios.put(`${ENV.HOSTNAME}api/setpassword/:link`, data)
                .then((response) => {});
        } catch (error) {
            console.log(error);
        }
    }
}

export const assignNewPassword = (data) => {
    return async function(dispatch) {
        try {
            await axios.put(`${ENV.HOSTNAME}api/assign-password`, data)
                .then((response) => {});
        } catch (error) {
            console.log(error);
        }
    }
}

export const compareAccessToken = () => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}api/auth`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                })
                .then((response) => {
                    dispatch(login(response.data));
                });
        } catch (error) {
            console.log(error);
            localStorage.removeItem("token");
            dispatch(logout());
        }
    };
}

export const updateProfileInfo = (main) => {

    return async function(dispatch) {
        try {
            await axios.put(`${ENV.HOSTNAME}api/update-profile`, main)
                .then((response) => {

                })
        } catch (error) {

        }
    }
}

export const getProfileInfo = (id) => {

    console.log(id)
    
    return async function(dispatch) {
        try {

        } catch (error) {
            
        }
    }
}