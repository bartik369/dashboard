import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth ',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setCredentials: (state)
    },
})


export default authSlice.reducer