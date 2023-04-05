import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import ENV from "../../../env.config";


export const signin = createAsyncThunk("auth/signin",
    async (data, thunkAPI) => {
        try {
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await axios.post(`${ENV.HOSTNAME}api/signin`, data, config);

            return response.data

        } catch (error) {
            console.log("Error", error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const singup = createAsyncThunk("auth/singup",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${ENV.HOSTNAME}api/signup`, data)
            return response.data
        } catch (error) {
            console.log("Error", error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const checkValidToken = createAsyncThunk("api/auth",
    async () => {
        try {
            const response = await axios.get(`${ENV.HOSTNAME}api/auth`)
            return response.data
        } catch (error) {
            console.log("Error", error.response.data);
        }
    }
)


const initialState = {
    user: {},
    token: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth",
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
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.accessToken
        })
        builder.addCase(checkValidToken.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.accessToken
        })
    },
});


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENV.HOSTNAME }),
    endpoints: (builder) => ({


        // // resset password
        // resetPassword: builder.mutation({
        //     query: (body) => ({
        //         url: "api/reset",
        //         method: "post",
        //         body,
        //     }),
        // }),

        // // set new password
        // setPassword: builder.mutation({
        //     query: (body) => ({
        //         url: "api/setpassword/:link",
        //         method: "put",
        //         body,
        //     }),
        // }),

        // // compare password link
        // comparePasswordLink: builder.mutation({
        //     query: (link) => ({
        //         url: `api/setpassword/${link}`,
        //         method: "get",
        //     }),
        //     transformResponse: (response, meta, arg) => console.log("data from query compare", response)
        // }),

    }),
});


export default authSlice.reducer;
export const {} = authApi;
export const {logOut} = createSlice;

export const {
    useSigninMutation,
    useSignupMutation,
    useResetPasswordMutation,
    useSetPasswordMutation,
    useComparePasswordLinkMutation,
} = authApi;
