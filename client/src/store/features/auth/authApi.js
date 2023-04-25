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
        getUserProfile: builder.query({
            queryFn: async (id) => {
                try {
                    const response = await axios.get(`${ENV.HOSTNAME}/api/profile/${id}`);
                    console.log(response);
                    return {data: await response.json()};
                } catch (error) {
                    return {error: error.message}
                }
            }
            // query: (id) => ({
            //     url: `api/profile/${id}`,
            //     method: "GET",
            // })
        })
    }),

});

export const { useSigninMutation, useSignupMutation, useGetUserProfileQuery } = authApi;



