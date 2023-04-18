import { apiSlice } from "../../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (credentials) => ({
                url: "/api/signin",
                method: "POST",
                body: {...credentials },
            })
        }),

        signup: builder.mutation({
            query: (credentials) => ({
                url: "/api/signup",
                method: "POST",
                body: {...credentials },
            })
        }),
    }),

});

export const { useSigninMutation, useSignupMutation } = authApi;