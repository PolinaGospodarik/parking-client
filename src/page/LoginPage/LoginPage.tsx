// import stylesContainer from '../../common/styles/Container.module.scss';
import styles from './LoginPage.module.scss'
import LoginForm from "./LoginForm/LoginForm.tsx";
import location from '../../assets/location 1.svg'
import {Box, Grid} from "@mui/material";


const LoginPage = () => {
    return (
        <>
            <Box className={styles.login}>
                <Grid container spacing={0} justifyContent="center" alignItems="center" height="100%">
                    <Grid size={6} className={styles.loginWrapperLeft}>
                        <img className={styles.img} src={location} alt="локация"/>
                    </Grid>
                    <Grid size={6} width="50%" sx={{display:"flex", justifyContent:"center"}}>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default LoginPage;