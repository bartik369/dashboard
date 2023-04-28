import { apiSlice } from "../../api/apiSlice";
import axios from "axios";
import ENV from "../../../env.config";
import { setProfile } from "./authSlice";

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
                method: "POST",
                body: {...credentials },
            })
        }),
        // userProfile: builder.query({
        //     query: (id) => ({
        //         url: `api/profile/${id}`,
        //         method: "GET",
        //     }),
        //     transformResponse: async(response, meta, arg) => {
        //         if (response) {
        //             setProfile(response)
        //             return response;
        //         }
        //     },
        // }),
    }),
});

export const { useSigninMutation, useSignupMutation, useUserProfileQuery, useUpdateProfileMutation, } =
authApi;

// queryFn: async(id) => {
//             try {
//                 const response = await axios.get(`${ENV.HOSTNAME}api/profile/${id}`);
//                 // return {data: await response.data.json()};
//                 return { data: await response.data };
//             } catch (error) {
//                 return { error: error.message }
//             }
//         }