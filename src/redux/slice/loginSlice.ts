import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {saveTokensToLocalStorage} from "../../utils/authUtils.ts";

const API_URL = "http://localhost:5000/";

type User = {
    fullName: string,
    phoneNumber: string,
}

type LoginState = {
    user?: User | null,
    tel: string;
    password: string;
    role?: string | null;
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
    user: null,
    tel: "",
    password: "",
    role: null,
    errors: {
        tel: null,
        password: null,
    },
    loading: false,
}

export const login = createAsyncThunk<string, LoginState>(
    'login/login',
    async ({tel, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL + "auth/login", {
                phoneNumber: tel,
                password: password
            });
            const { accessToken, refreshToken } = response.data;
            console.log(accessToken,refreshToken);
            saveTokensToLocalStorage(accessToken, refreshToken);
            return response.data.user.role;
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
                { refreshToken }
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

export const userGet = createAsyncThunk<User, void, { rejectValue: string }>(
    'login/user',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL + "auth/user");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка входа");
        }
    }
);


export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setRoleFromStorage: (state) => {
            const storedRole = localStorage.getItem('userRole');
            if (storedRole) {
                state.role = storedRole;
            }
        },
        signOut: (state) => {
            state.user = null;
            state.role = null;
            localStorage.removeItem('userRole');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.role = payload;
                localStorage.setItem('userRole', payload);
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                // state.errors.tel = action.payload || 'Ошибка при выполнении входа';
            })

            //user
            .addCase(userGet.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(userGet.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.user = payload;
            })
            .addCase(userGet.rejected, (state) => {
                state.loading = false;

            })

    }
})
const {actions, reducer} = loginSlice;
export const {setRoleFromStorage, signOut} = actions;
export default reducer;
