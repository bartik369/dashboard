import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, setProfile } from "../features/auth/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
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
                    const profile = await axios.get(`${ENV.HOSTNAME}api/profile/${response.data.user.id}`)
                    dispatch(setProfile({...profile.data,
                        profile: profile.data,
                    }))
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





// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//     console.log("result b", result)

//     if (result?.error?.originalStatus === 403) {
//         console.log("sending refresh token");
//         const refreshResult = await baseQuery("api/refresh", api, extraOptions);

//         if (refreshResult?.data) {
//             const user = api.getState().auth.user;
//             //  store a new token
//             api.dispatch(setCredentials({...refreshResult.data, user }));
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logOut())
//         }
//     }
//     return result
// };