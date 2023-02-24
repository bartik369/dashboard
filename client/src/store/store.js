// import { applyMiddleware, legacy_createStore as createStore } from 'redux';
// import rootReducer from './reducers/rootReducer';
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// const middleware = [thunk]

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import { devicesApi } from "./devices/devicesApi";
import { authApi } from "./api/authApi";

export default configureStore({
    reducer: {
        [devicesApi.reducerPath]: devicesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(devicesApi.middleware)
});