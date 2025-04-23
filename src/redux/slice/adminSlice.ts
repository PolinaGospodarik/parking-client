import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/";

export type Booking = {
    id: number;
    carId: number;
    placeNumber: number;
    startTime: string;
    endTime: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type Car = {
    id: number;
    userId: number;
    carNumber: string;
    createdAt: string;
    updatedAt: string;
    Booking: Booking[];
};

export type User = {
    id: number;
    fullName: string;
    phoneNumber: string;
    password: string;
    role: string;
    cars: Car[];
    allBookings: Booking[];
    loading: boolean;
    error: string | null;
};

type AdminState = {
    users: User[];
    loading: boolean;
    error: string | null;
};

const initialState: AdminState = {
    users: [],
    loading: false,
    error: null,
};

export const admin = createAsyncThunk<User[], void, { rejectValue: string }>(
    'admin/admin',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL + "admin/user");
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка регистрации");
        }

    }
);


export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(admin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(admin.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.users = payload;

            })
            .addCase(admin.rejected, (state) => {
                state.loading = false;
            })

    }
})
const {actions, reducer} = adminSlice;
export const {} = actions;
export default reducer;
