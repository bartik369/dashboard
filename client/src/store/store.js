import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import searchReducer from "../store/features/search/searchSlice"
import authReducer from "../store/features/auth/authSlice";
import { todoApi } from "./features/todos/todoApi"
import { deviceApi } from "./features/devices/deviceApi";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        [deviceApi.reducerPath]: deviceApi.reducer,
        auth: authReducer,
        search: searchReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([apiSlice.middleware, todoApi.middleware, deviceApi.middleware]),
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware),
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(deviceApi.middleware),
    devTools: true,

})