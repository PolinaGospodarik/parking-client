import { configureStore } from '@reduxjs/toolkit'
import {loginSlice} from "../slice/loginSlice.ts";

const rootReducer = {
    auth: loginSlice.reducer,
};
const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


