import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/";

type RegistrationState = {
    fullName: string
    tel: string;
    password?: string;
    role: string;
    errors?: {
        tel: string | null;
        password: string | null;
    } | null;
    loading?: boolean;
}

const initialState: RegistrationState = {
    fullName: "",
    tel: "",
    password: "",
    role: "",
    errors: {
        tel: null,
        password: null,
    },
    loading: false,
}

export const registration = createAsyncThunk<string, RegistrationState>(
    'registration/registration',
    async ({fullName, tel, role}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL + "admin/register/create", {
                fullName: fullName,
                phoneNumber: tel,
                role: role
            });

            return response.data.password;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка регистрации");
        }

    }
);


export const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(registration.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registration.rejected, (state) => {
                state.loading = false;
                // state.errors.tel = action.payload || 'Ошибка при выполнении входа';
            })

    }
})
const {actions, reducer} = registrationSlice;
export const {} = actions;
export default reducer;
