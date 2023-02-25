import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../../env.config";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    endpoints: (builder) => ({
        signin: builder.mutation({
                query: ({ email, password }) => {
                    return {
                        url: "api/login",
                        method: "POST",
                    }
                }
            })
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
    })
})

export const { useSigninMutation } = authApi;