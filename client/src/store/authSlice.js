import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    isAuth: false,
}

export const AuthSlice = createSlice({
    name: 'auth ',
    initialState,
    reducers: {

    },
})

export const {} = AuthSlice.actions

export default AuthSlice.reducer