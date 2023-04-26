import { apiSlice } from "../../api/apiSlice";
import axios from "axios";
import ENV from "../../../env.config";


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
        userProfile: builder.query({
            // queryFn: async (id) => {
            //     console.log("id frokm quey", id)
            //     try {
            //         const response = await axios.get(`${ENV.HOSTNAME}api/profile/${id}`);
            //         console.log("response from api slise", response.data);
            //         // return {data: await response.data.json()};
            //         return {data: await response.data.json()};
            //     } catch (error) {
            //         return {error: error.message}
            //     }
            // }
            query: (id) => ({
                url: `api/profile/${id}`,
                method: "GET",
            }),
            transformResponse: (response, meta, arg) => {
                
                if (response) {
                    return response;
                }
            }
        })
    }),

});

export const { useSigninMutation, useSignupMutation, useUserProfileQuery } = authApi;



