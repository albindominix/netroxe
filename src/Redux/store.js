import {  configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux"
import UserSlice from "./slices/UserSlice";
import TasksSlice from "./slices/TasksSlice";
import {persistReducer} from "redux-persist";
import  {thunk}  from "redux-thunk";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    UserSlice,TasksSlice
});

const presistConfig={
    key:'root',
    storage,
    whitelist:["UserSlice"],
}
const presistedReducer = persistReducer(presistConfig,reducers);
const store = configureStore({
    reducer:presistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store