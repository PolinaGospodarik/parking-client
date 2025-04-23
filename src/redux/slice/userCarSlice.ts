import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/";


type Car = {
    id: number;
    userId: number;
    carNumber: string;
    createdAt: string;
    updatedAt: string;
};

type UserCarState = {
    carNumber: string;
    cars: Car[];
    errors: {
        carNumber: string | null;
    };
    loading?: boolean;
}

const initialState: UserCarState = {
    carNumber: "",
    cars: [],
    errors: {
        carNumber: null,
    },
    loading: false,
}

export const userCarCreate = createAsyncThunk<string, { carNumber: string },{ rejectValue: string }>(
    'userCar/userCarCreate',
    async ({carNumber}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL + "user/cars/create", {
                number: carNumber,
            });
            return response.data.number
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }

    }
);

export const userCarAll = createAsyncThunk<Car[], void, { rejectValue: string }>(
    'userCar/userCarAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL + "user/cars");
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }

    }
);

export const userCarDelete = createAsyncThunk<number, { id: number }, { rejectValue: string }>(
    'userCar/userCarDelete',
    async ({id}, {rejectWithValue}) => {
        try {
            await axios.delete(`${API_URL}user/cars/delete/${id}`);
            return id
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Неизвестная ошибка"
            );
        }
    }
);



export const userCarSlice = createSlice({
    name: "userCar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userCarCreate.pending, (state) => {
                state.loading = true;
                state.errors.carNumber = null;
            })
            .addCase(userCarCreate.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.carNumber = payload;
            })
            .addCase(userCarCreate.rejected, (state, {payload}) => {
                state.loading = false;
                state.errors = {
                    carNumber: payload as string,
                };
            })

            //userCarAll
            .addCase(userCarAll.pending, (state) => {
                state.loading = true;
                state.errors.carNumber = null;
            })
            .addCase(userCarAll.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.cars = payload;
            })
            .addCase(userCarAll.rejected, (state, {payload}) => {
                state.loading = false;
                state.errors = {
                    carNumber: payload as string,
                };
            })

            //userCarDelete
            .addCase(userCarDelete.pending, (state) => {
                state.loading = true;
                state.errors.carNumber = null;
            })
            .addCase(userCarDelete.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.cars = state.cars.filter((car) => car.id !== payload);

            })
            .addCase(userCarDelete.rejected, (state) => {
                state.loading = false;

            })

    }
})
const {actions, reducer} = userCarSlice;
export const {} = actions;
export default reducer;
