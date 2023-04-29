import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (credentials) => ({
                url: "/api/signin",
                method: "POST",
                body: {...credentials },
            }),
        }),

        signup: builder.mutation({
            query: (credentials) => ({
                url: "/api/signup",
                method: "POST",
                body: {...credentials },
            }),
        }),

        updateProfile: builder.mutation({
            query: (credentials) => ({
                url: "/api/update-profile",
                method: "PUT",
                body: {...credentials },
            }),
            //     transformResponse: async(response, meta, arg) => {
            //         if (response) {
            //             setProfile(response)
            //             return response;
            //         }
            //     },
            // }),
        }),
        updateUserPassword: builder.mutation({
            query: (credentials) => ({
                url: "/api/assign-password",
                method: "PUT",
                body: {...credentials },
            })
        })
    }),
});

export const { useSigninMutation, useSignupMutation, useUpdateProfileMutation, useUpdateUserPasswordMutation } =
authApi;