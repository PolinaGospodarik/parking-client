import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#008A5E"
        },
        secondary: {
            main: '#CBCBCB',
            light: '#F5F5F5',
            dark: '#232323',
        },
    },
    typography: {
        fontFamily: 'Nunito, Arial, sans-serif',
        h1: {
            fontFamily: 'Multiround Pro',
            fontWeight: 400,
            fontSize: "20px",
            color: "#F5F5F5",
            lineHeight: "22px",
        },
        h2: {

        },
        h4: {
            fontFamily: 'Multiround Pro',
            fontSize: '24px',
            fontWeight: 400,
        },
        h5: {
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: "16px",
            color: "#232323",
        },


    },
    components: {
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    fontSize: '1.2rem',
                },
            },
        },
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
                        color: '#F5F5F5',
                        '&:hover': {
                            backgroundColor: 'rgb(1,115,79)',
                            color: '#F5F5F5',
                        },
                    },
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        padding: '5px 10px',
                        fontSize: "16px",
                        border: '2px solid #008A5E',
                        color: '#008A5E',
                        '&:hover': {
                            backgroundColor: '#008A5E',
                            color: '#F5F5F5',
                        },
                    },
                },
                {
                    props: { variant: 'text' },
                    style: {
                        color: '#008A5E',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#F5F5F5',
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
                    color: '#008A5E',
                    fontSize: '16px',
                    fontWeight: 600,
                    margin: "5px",
                    '&.Mui-selected': {
                        color: '#F5F5F5',
                        borderRadius: "10px",
                        backgroundColor:"#008A5E",
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
                    color: '#F5F5F5',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#008A5E', // боковая панель
                    color: '#F5F5F5',
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
