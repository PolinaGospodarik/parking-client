import {Box, Typography} from "@mui/material";

const Logo = () => {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40.1869" height="40.3846" rx="5" fill="#232323"/>
                    <rect x="3.34912" y="3.36538" width="33.4891" height="33.6539" rx="5" fill="#008A5E"/>
                    <rect x="6.69775" y="6.73077" width="26.7913" height="26.9231" rx="5" fill="#232323"/>
                    <path d="M10.6225 26.4615V10.7315H23.8005C25.4285 10.7315 26.6899 11.1422 27.5845 11.9635C28.4939 12.7849 28.9485 14.0315 28.9485 15.7035C28.9485 17.3755 28.4939 18.6222 27.5845 19.4435C26.6899 20.2649 25.4285 20.6755 23.8005 20.6755H14.1425V26.4615H10.6225ZM23.3825 13.5915H14.1425V17.7935L23.3825 17.8155C24.0279 17.8155 24.5192 17.6542 24.8565 17.3315C25.2085 17.0089 25.3845 16.4662 25.3845 15.7035C25.3845 14.9262 25.2085 14.3835 24.8565 14.0755C24.5192 13.7529 24.0279 13.5915 23.3825 13.5915Z" fill="#F5F5F5"/>
                </svg>
                <Typography variant="h6" sx={{  width: "123px", marginLeft: "9px" }}>Парковка БНТУ</Typography>
            </Box>
        </>
    );
};

export default Logo;