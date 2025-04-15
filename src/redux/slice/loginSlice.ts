import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {saveTokensToLocalStorage} from "../../utils/authUtils.ts";

const API_URL = "http://localhost:5000/";

type LoginState = {
    tel: string;
    password: string;
    errors?: {
        tel: string | null;
        password: string | null;
    } | null;
    loading?: boolean;
}

type AuthResponse = {
    accessToken: string;
    refreshToken: string;
}

const initialState: LoginState = {
    tel: "",
    password: "",
    errors: {
        tel: null,
        password: null,
    },
    loading: false,
}

export const login = createAsyncThunk<string, LoginState>(
    'auth/login',
    async ({tel, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL + "auth/login", {
                phoneNumber: tel,
                password: password
            });
            const { accessToken, refreshToken } = response.data;
            console.log(accessToken,refreshToken);
            saveTokensToLocalStorage(accessToken, refreshToken);

            return response.data.token;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка входа");
        }

    }
);

export const refreshAccessToken = createAsyncThunk<
    AuthResponse,
    { refreshToken: string },
    { rejectValue: string }
>(
    'login/refreshAccessToken',
    async ({ refreshToken }, { rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>(
                `${API_URL}auth/refresh`,
                { refreshToken } // тело запроса — JSON
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Ошибка обновления токена');
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);


export const loginSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                // state.errors.tel = action.payload || 'Ошибка при выполнении входа';
            })

    }
})
const {actions, reducer} = loginSlice;
export const {} = actions;
export default reducer;
