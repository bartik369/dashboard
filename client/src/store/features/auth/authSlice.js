import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth ',
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
        }
    },
})


export default authSlice.reducer
export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrenToken = (state) => state.auth.token;