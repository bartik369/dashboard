import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import searchReducer from "../store/features/search/searchSlice"
import authReducer from "../store/features/auth/authSlice";
import { todoApi } from "./features/todos/todoApi"
import { deviceApi } from "./features/devices/deviceApi";
import { messengerApi } from "./features/messenger/messengerApi";


export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        [deviceApi.reducerPath]: deviceApi.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [messengerApi.reducerPath]: messengerApi.reducer,
        auth: authReducer,
        search: searchReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        apiSlice.middleware,
        todoApi.middleware,
        deviceApi.middleware,
        messengerApi.middleware,
    ]),
    devTools: true,

})