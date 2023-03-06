import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (credentials) => ({
                url: 'api/signin',
                method: "POST",
                body: {...credentials}
            })
        }),
    })
})


export const {useSigninMutation} = authApiSlice;


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