import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ENV from "../../../env.config";

const initialState = {
    user: null,
    token: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth ",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const signin = createAsyncThunk(
    "api/signin",
    async({ email, password }, thunkAPI) => {
        try {
            const response = await fetch(`${ENV.HOSTNAME}api/signin`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            let data = await response.json();
            console.log("data", data);

            if (response.status === 200) {

                // return {...data, username: name, email: email };
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log("Error", error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    endpoints: (builder) => ({

        checkValidToken: builder.query({
            query: () => ({
                url: "/api/auth",
                method: "GET",
            }),
        }),
    }),
});

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import ENV from "../../env.config";

// export const authApi = createApi({
//     reducerPath: "authApi",
//     baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
//     endpoints: (builder) => ({

//         // signup
//         signup: builder.mutation({
//             query: (body) => ({
//                 url: "api/signup",
//                 method: "post",
//                 body,
//             }),
//         }),

//         // signin
//         signin: builder.mutation({
//             query: (body) => ({
//                 url: "api/signin",
//                 method: "post",
//                 body,
//             }),
//         }),

//         // resset password
//         resetPassword: builder.mutation({
//             query: (body) => ({
//                 url: "api/reset",
//                 method: "post",
//                 body,
//             }),
//         }),

//         // set new password
//         setPassword: builder.mutation({
//             query: (body) => ({
//                 url: "api/setpassword/:link",
//                 method: "put",
//                 body,
//             }),
//         }),

//         // compare password link
//         comparePasswordLink: builder.mutation({
//             query: (link) => ({
//                 url: `api/setpassword/${link}`,
//                 method: "get",
//             }),
//             transformResponse: (response, meta, arg) => console.log("data from query compare", response)
//         }),
//     }),
// });

// export const {
//     useSigninMutation,
//     useSignupMutation,
//     useResetPasswordMutation,
//     useSetPasswordMutation,
//     useComparePasswordLinkMutation
// } = authApi;

// // checkValidToken: builder.query({
// //     query: () => ({
// //         baseUrl: "/api/auth",
// //         prepareHeaders: (headers, { getState }) => {
// //             const token = getState().auth.token

// //             if (token) {
// //                 headers.set('authorization', `Bearer ${token}`)
// //             }

// //             return headers
// //         },
// //     })
// // })