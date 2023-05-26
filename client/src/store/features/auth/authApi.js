import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        // auth part
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

        getProfile: builder.query({
            query: (id) => ({
                url: `/api//profile/${id}`,
                method: "GET",
            }),
            transformErrorResponse: (response, meta, arg) => response.status,
        }),
        getUsers: builder.query({
            query: () => ({
                url: "/api/users",
                method: "GET"
            })
        }),
        updateProfile: builder.mutation({
            query: (credentials) => ({
                url: "/api/update-profile",
                method: "PUT",
                body: {...credentials },
            }),
        }),
        updateUserPassword: builder.mutation({
            query: (credentials) => ({
                url: "/api/assign-password",
                method: "PUT",
                body: {...credentials },
            })
        }),

        setNewPassword: builder.mutation({
            query: (credentials, link) => ({
                url: `/api/setpassword/${link}`,
                method: "PUT",
                body: {...credentials }
            })
        }),

        resetPassword: builder.mutation({
            query: (credentials) => ({
                url: "/api/reset",
                method: "POST",
                body: {...credentials }
            })
        }),
        checkLink: builder.query({
            query: (link) => ({
                url: `/api/setpassword/${link}`,
                method: "GET",
            })
        }),

        //roles request

        getRolesRequests: builder.query({
            query: () => ({
                url: "/api/roles-requests/",
                method: "GET",
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.map(({ id }) => ({ type: 'Roles', id })), 'Roles'] : ['Roles'],
        }),

        rolesRequest: builder.mutation({
            query: (credentials) => ({
                url: "/api/requests/roles",
                method: "POST",
                body: {...credentials },
            }),
            invalidatesTags: { type: 'Roles', id: 'LIST' }
        }),

        rolesRespond: builder.mutation({
            query: (credentials) => ({
                url: `/api/responds/roles`,
                method: "PUT",
                body: {...credentials }
            }),
            invalidatesTags: { type: 'Roles', id: 'LIST' }
        }),

    }),
});

export const {
    useSigninMutation,
    useSignupMutation,
    useUpdateProfileMutation,
    useUpdateUserPasswordMutation,
    useCheckLinkQuery,
    useResetPasswordMutation,
    useSetNewPasswordMutation,
    useGetRolesRequestsQuery,
    useRolesRequestMutation,
    useRolesRespondMutation,
    useGetProfileQuery,
    useGetUsersQuery,
} = authApi;;