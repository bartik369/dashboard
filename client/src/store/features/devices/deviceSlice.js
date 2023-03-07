import  {createSlice} from "@reduxjs/toolkit";

const initialState = {
    devices: [],
    device: {},
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState: {
        devices: null,
        device: null,
    }
})