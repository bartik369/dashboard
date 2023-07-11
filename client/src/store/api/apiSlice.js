import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../features/auth/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import ENV from "../../env.config";


const baseQuery = fetchBaseQuery({
    baseUrl: ENV.HOSTNAME,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`, 'Access-Control-Allow-Origin', '*');
        }
        return headers;
    },
});

// check valid access token


export const useValidateAccessToken = () => {
    const dispatch = useDispatch();
    const validateAccessToken = async() => {

        try {
            const response = await axios.get(`${ENV.HOSTNAME}api/auth`, {
                withCredentials: true,
            });

            if (response.data) {
                try {
                    dispatch(setCredentials({...response.data,
                        user: response.data.user,
                        token: response.data.accessToken,
                    }));

                } catch (error) {

                }
            }
        } catch (error) {
            if (error.response.status === 403) {
                const response = await axios.get(`${ENV.HOSTNAME}api/refresh`, {
                    withCredentials: true,
                });

                if (response.data) {
                    dispatch(setCredentials({...response.data,
                        user: response.data.user,
                        token: response.data.accessToken,
                    }));
                }
            }
        }

    }
    return validateAccessToken;
};

// Logout

export const signout = async() => {
    const response = await axios.get(`${ENV.HOSTNAME}api/logout`, {
        withCredentials: true,
    });
    return response
}

// Get user profile info

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: (builder) => ({})
})

export default baseQuery;