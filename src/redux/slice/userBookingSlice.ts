import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/";

type BookingPayload = {
    carId: number;
    from: string;
    to: string;
};

type BookingResponse = {
    id: number;
    carId: number;
    status: string;
    placeNumber: number;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    car?: {
        id: number;
        userId: number;
        carNumber: string;
        createdAt: string;
        updatedAt: string;
    };
};

type UserBookingState = {
    booking: BookingResponse | null;
    loading: boolean;
    error: string | null;
    history: BookingResponse[];
    current: BookingResponse | null;
    feature: BookingResponse[];
};

const initialState: UserBookingState = {
    booking: null,
    loading: false,
    error: null,
    history: [],
    current: null,
    feature: [],
};

export const userBookingCreate = createAsyncThunk<BookingResponse, BookingPayload, { rejectValue: string }>(
    'userBooking/userBookingCreate',
    async ({ carId, from, to }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL + "user/booking/create", {
                carId, from, to,
            });
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }

    }
);

export const userBookingDelete = createAsyncThunk<number, { id: number }, { rejectValue: string }>(
    'userBooking/userBookingDelete',
    async ({id}, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}user/booking/${id}`);
            return id
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }

    }
);

export const userBookingHistory = createAsyncThunk<BookingResponse[], void, { rejectValue: string }>(
    'userBooking/userBookingHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL + "user/booking/history");
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }

    }
);

export const userBookingFeature = createAsyncThunk<BookingResponse[], void, { rejectValue: string }>(
    'userBooking/userBookingFeature',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL + "user/booking/feature");
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }

    }
);

export const userBookingCurrent = createAsyncThunk<BookingResponse, void, { rejectValue: string }>(
    'userBooking/userBookingCurrent',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL + "user/booking/current");
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }

    }
);

export const userBookingSlice = createSlice({
    name: "userBooking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userBookingCreate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.booking = null;
            })
            .addCase(userBookingCreate.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.booking = payload;
            })
            .addCase(userBookingCreate.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload || "Неизвестная ошибка";
            })

            // //userBookingDelete
            .addCase(userBookingDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userBookingDelete.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.feature = state.feature.filter((booking) => booking.id !== payload);
            })
            .addCase(userBookingDelete.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload || "Неизвестная ошибка";
            })

            //userBookingAll
            .addCase(userBookingHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userBookingHistory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.history =payload; // Обработка одиночного объекта
            })
            .addCase(userBookingHistory.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload || "Неизвестная ошибка";
            })

            //userBookingFeature
            .addCase(userBookingFeature.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userBookingFeature.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.feature = payload;
            })
            .addCase(userBookingFeature.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload || "Неизвестная ошибка";
            })


            //userBookingCurrent
            .addCase(userBookingCurrent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userBookingCurrent.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.current = payload;
            })
            .addCase(userBookingCurrent.rejected, (state, {payload}) => {
                state.loading = false;
                state.error = payload || "Неизвестная ошибка";
            })

    }
})
const {actions, reducer} = userBookingSlice;
export const {} = actions;
export default reducer;
