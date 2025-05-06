import RegistrationForm from "./RegistrationForm/RegistrationForm.tsx";
import HeaderAdmin from "../../components/Header/HeaderAdmin.tsx";
import {Box} from "@mui/material";


const RegistrationPage = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'secondary.light', height:"100vh" }}>
                <HeaderAdmin/>
                <RegistrationForm/>
            </Box>
        </>
    );
};

export default RegistrationPage;