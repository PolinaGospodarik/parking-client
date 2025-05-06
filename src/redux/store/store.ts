import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "../slice/loginSlice.ts";
import registrationSlice from "../slice/registrationSlice.ts";
import userCarSlice from "../slice/userCarSlice.ts";
import userBookingSlice from "../slice/userBookingSlice.ts";
import adminSlice from "../slice/adminSlice.ts";
import guardSlice from "../slice/guardSlice.ts";

const rootReducer = {
    login: loginSlice,
    registration: registrationSlice,
    userCar: userCarSlice,
    userBooking: userBookingSlice,
    admin: adminSlice,
    guard: guardSlice
};
const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


