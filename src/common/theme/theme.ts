import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#008A5E"
        },
        secondary: {
            main: '#F5F5F5',
        },
    },
    typography: {
        fontFamily: 'Nunito, Arial, sans-serif',
        h1: {
            fontFamily: 'Multiround Pro',
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: "35px",
        },
        h2: {
            fontSize: '18px',
            fontWeight: 600,
        },
        h6: {
            fontFamily: 'Multiround Pro',
            fontWeight: 400,
            fontSize: "20px",
            color: "#F5F5F5",
            lineHeight: "22px",
        },

    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    padding: '10px 20px',
                    textTransform: 'none',
                    fontFamily: "Nunito",
                    fontSize: "18px",
                    fontWeight: 700,
                },
            },
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        backgroundColor: '#008A5E',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgb(1,115,79)',
                        },
                    },
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        border: '2px solid #1976d2',
                        color: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#f0f0f0',
                        },
                    },
                },
                {
                    props: { variant: 'text' },
                    style: {
                        color: '#1976d2',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            ],
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    overflow: 'visible', // Убираем ограничение на видимость тени
                },
                indicator: {
                    display: 'none',
                    overflow: 'visible'
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#FFF',
                    fontSize: '16px',
                    fontWeight: 600,
                    margin: "5px",
                    '&.Mui-selected': {
                        color: '#FFF',
                        borderRadius: "10px",
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#008A5E', // верхняя панель
                    color: '#FFF',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#008A5E', // боковая панель
                    color: '#FFF',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    fontFamily: 'Nunito, Arial, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    '&.Mui-selected': {
                        backgroundColor: '#F5F5F5',
                        color: '#F5F5F5',
                        fontWeight: 900,
                        '& .MuiListItemIcon-root': {
                            color: '#F5F5F5',
                        },
                        '&:hover': {
                            backgroundColor: '#006f4d',
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'rgb(1,115,79)',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontFamily: 'Nunito, Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                },
            },
        },

    },
});

export default theme;
