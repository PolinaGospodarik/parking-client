import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Booking} from"../../types/types.ts";
import axios from "axios";

const API_URL = "http://localhost:5000/";

type GuardState = {
    bookingStart: Booking | null;
    bookingEnd: Booking | null;
    loading: boolean;
    error: string | null;
};

const initialState: GuardState = {
    bookingStart: null,
    bookingEnd: null,
    loading: false,
    error: null,
};


export const guardGetStart = createAsyncThunk<Booking, string, { rejectValue: string }>(
    'guard/guardGetStart',
    async (carNumber, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL + "security/booking/start", {
                carNumber
            });
            console.log(response.data.booking)
            return response.data.booking;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка при разрешении въезда");
        }
    }
);

export const guardGetEnd = createAsyncThunk<Booking, string, { rejectValue: string }>(
    'guard/guardGetEnd',
    async (carNumber, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL + "security/booking/end", {
                carNumber
            });
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка при разрешении въезда");
        }
    }
);

export const guardSlice = createSlice({
    name: "guard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(guardGetStart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(guardGetStart.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingStart = action.payload;
            })
            .addCase(guardGetStart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

        // guardGetEnd
            .addCase(guardGetEnd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(guardGetEnd.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingEnd = action.payload;
            })
            .addCase(guardGetEnd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

const { actions, reducer } = guardSlice;
export const {} = actions;
export default reducer;
