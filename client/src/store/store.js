import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/apiSlice";
import searchReducer from "../store/features/search/searchSlice"
import authReducer from "../store/features/auth/authSlice";
import { todoApi } from "./features/todos/todoApi"
import { deviceApi } from "./features/devices/deviceApi";
import { authApi } from "./features/auth/authApi";


export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        [deviceApi.reducerPath]: deviceApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        search: searchReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([authApi.middleware, todoApi.middleware, deviceApi.middleware]),
    devTools: true,

})