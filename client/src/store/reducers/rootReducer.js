import { combineReducers } from "redux";
import devicesReducer from "./devicesReducer";
import todosReducer from "./todosReducer";
import usersReducer from "./usersReducer";
import searchDataReducer from "./searchDataReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    user: usersReducer,
    isAuth: usersReducer,
    devices: devicesReducer,
    device: devicesReducer,
    todos: todosReducer,
    todo: todosReducer,
    seqrchQuery: searchDataReducer,

});

export default rootReducer;