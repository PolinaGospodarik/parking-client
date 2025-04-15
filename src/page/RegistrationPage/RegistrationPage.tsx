import RegistrationForm from "./RegistrationForm/RegistrationForm.tsx";
import Header from "../../components/Header/Header.tsx";
import {Box} from "@mui/material";


const RegistrationPage = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'secondary.main' }}>
                <Header/>
                <RegistrationForm/>
            </Box>
        </>
    );
};

export default RegistrationPage;