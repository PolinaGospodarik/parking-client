// src/utils/axiosInterceptor.ts
import axios from 'axios';
import { refreshAccessToken } from '../redux/slice/loginSlice.ts';
import { getTokensFromLocalStorage, saveTokensToLocalStorage } from './authUtils';
import store from '../redux/store/store'; // Используем дефолтный импорт store

axios.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { refreshToken } = getTokensFromLocalStorage();
                if (refreshToken) {
                    const dispatch = store.dispatch;
                    const resultAction = await dispatch(refreshAccessToken({ refreshToken }));

                    if (refreshAccessToken.fulfilled.match(resultAction)) {
                        const { accessToken} = resultAction.payload;

                        saveTokensToLocalStorage(accessToken, refreshToken);
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                        return axios(originalRequest);
                    } else {
                        return Promise.reject(resultAction.payload);
                    }
                }
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

axios.interceptors.request.use((config) => {
    const { accessToken } = getTokensFromLocalStorage();

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
});


