import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";
import axios from "axios";
import ENV from "../../env.config";

const baseQuery = fetchBaseQuery({
    baseUrl: ENV.HOSTNAME,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const useRefreshToken = () => {

    const refresh = async() => {
        const response = await baseQuery('api/refresh', {
            withCredentials: true
        });
        console.log(response)
        return response.data.accessToken;
    }
    return refresh;
};


const baseQueryWithReauth = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result) {
        // if (result?.error?.originalStatus === 403) {
        console.log("sending refresh token");
        const refreshResult = await baseQuery("/refresh", api, extraOptions);

        if (refreshResult) {
            // if (refreshResult ? .data) {
            const user = api.getState().auth.user;
            //  store a new token
            // api.dispatch(setCredentials({...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
})

export default baseQueryWithReauth;