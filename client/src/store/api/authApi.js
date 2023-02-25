import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../env.config";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: "",
                method: "post",
                body,
            }),
        }),
        signin: builder.mutation({
            query: (body) => ({
                url: "api/login",
                method: "post",
                body,
            }),
        }),
        ressetPassword: builder.mutation({
            query: (body) => ({
                url: "api/reset",
                method: "post",
                body,
            }),
        }),
        setPassword: builder.mutation({
            query: (body) => ({
                url: "api/reset",
                method: "post",
                body,
            }),
        }),
        ressetPassword: builder.mutation({
            query: (body) => ({
                url: "api/reset",
                method: "post",
                body,
            }),
        }),
    }),
});

export const { useSigninMutation } = authApi;

// checkValidToken: builder.query({
//     query: () => ({
//         baseUrl: "/api/auth",
//         prepareHeaders: (headers, { getState }) => {
//             const token = getState().auth.token

//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`)
//             }

//             return headers
//         },
//     })
// })