import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const AuthSlice = createSlice({
    name: 'auth ',
    initialState,
    reducers: {

    },
})

export const { increment, decrement, incrementByAmount } = AuthSlice.actions

export default AuthSlice.reducer