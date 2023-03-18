import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { todoApi } from "./todos/todoApi"
import { deviceApi } from "./features/devices/deviceApi";
import authReducer from "../store/features/auth/authSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        [deviceApi.reducerPath]: deviceApi.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(deviceApi.middleware),
    devTools: true,

})