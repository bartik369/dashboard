import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";
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



const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);


    if (result.data) {
        api.dispatch(setCredentials({...result.data,}));
    }
    return result
};

export const useValidateAccessToken = () => {

    const dispatch = useDispatch();
    const validateAccessToken = async () => {

        try {
            const response = await axios.get(`${ENV.HOSTNAME}api/auth`, {
                withCredentials: true,
            });

            if (response.data) {
                dispatch(setCredentials({...response.data,}));
                return response.data.accessToken;
            } else if (response.status === 403) {
                console.log("ooooops")
            }
          } catch (error) {
            console.log(error)
          }
    //   try {
    //     const response = await axios.get(`${ENV.HOSTNAME}api/auth`, {
    //         withCredentials: true,
    //     });

    //     if (response) {
    //         dispatch(setCredentials({...response.data,}));
    //     } 
    //     return response.data.accessToken;
    //   } catch (error) {
        
    //   }
    }
    return validateAccessToken;
};

// Logout

export const signout = async () => {
    const response = await axios.get(`${ENV.HOSTNAME}api/logout`, {
        withCredentials: true,
    });
    return response
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
})

export default baseQueryWithReauth;





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