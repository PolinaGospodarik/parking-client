import Header from "../../components/Header/Header.tsx";
import GuardListStart from "../../components/GuardListStart/GuardListStart.tsx";
import GuardListEnd from "../../components/GuardListEnd/GuardListEnd.tsx";
import {Box, Container} from "@mui/material";
import ParkingMap from "../../components/ParkingMap/ParkingMap.tsx";


const GuardPage = () => {
    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" sx={{pt:4}}>
                    <GuardListStart/>
                    <GuardListEnd/>
                </Box>
                <ParkingMap/>
            </Container>
        </>
    );
};

export default GuardPage;