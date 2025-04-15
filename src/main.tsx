import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

import {Provider} from "react-redux";
import store from "./redux/store/store.ts"

import {CssBaseline, ThemeProvider } from '@mui/material';
import theme from './common/theme/theme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
)
