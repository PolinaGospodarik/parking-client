import styles from './LoginPage.module.scss';
import LoginForm from "./LoginForm/LoginForm.tsx";
import location from '../../assets/location 1.svg';
import {Box, CircularProgress, Grid, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hook.ts";
import {useEffect} from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const role = useAppSelector((state) => state.login.role);
    const loading = useAppSelector((state) => state.login.loading);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // md = 900px

    useEffect(() => {
        if (!role) return;
        switch (role) {
            case 'USER':  navigate('/user/', { replace: true }); break;
            case 'ADMIN': navigate('/admin/', { replace: true }); break;
            case 'GUARD': navigate('/guard/', { replace: true }); break;
            default:      navigate('/login', { replace: true });
        }
    }, [role, navigate]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className={styles.login} sx={{ backgroundColor: 'secondary.light' }}>
            <Grid container spacing={0} justifyContent="center" alignItems="center" height="100%">
                {!isSmallScreen && (
                    <Grid item xs={12} md={6} className={styles.loginWrapperLeft}>
                        <img className={styles.img} src={location} alt="локация"/>
                    </Grid>
                )}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: isSmallScreen ? '100%' : '50%'
                    }}
                >
                    <LoginForm/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;