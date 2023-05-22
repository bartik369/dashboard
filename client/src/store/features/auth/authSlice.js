import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    // profile: {
    //     description: "",
    //     city: "",
    //     birthday: "",
    //     phone: "",
    //     work: {
    //         departament: "",
    //         workPhone: "",
    //         vocation: "",
    //     },
    // },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        // setProfile: (state, action) => {
        //     const { profile } = action.payload;
        //     state.profile = profile
        // },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            // state.profile = {
            //     description: "",
            //     city: "",
            //     birthday: "",
            //     phone: "",
            //     work: {
            //         departament: "",
            //         workPhone: "",
            //         vocation: "",
            //     },
            // };
        }
    },
})


export default authSlice.reducer
export const { setCredentials, setProfile, logOut } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;