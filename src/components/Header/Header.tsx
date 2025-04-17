import Logo from "./Logo/Logo.tsx";
import DynamicTabs from "../Tabs/Tabs.tsx";
import {Box, Container} from "@mui/material";

const Header = () => {
    return (
        <>
            <Box sx={{ backgroundColor: "primary.main", p: "10px 0" }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Logo/>
                        <DynamicTabs/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Header;