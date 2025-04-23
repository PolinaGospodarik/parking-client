import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook.ts";
import { userCarAll } from "../../redux/slice/userCarSlice.ts";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { userCarDelete } from "../../redux/slice/userCarSlice.ts";


import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";

const UserCarList = () => {
    const dispatch = useAppDispatch();
    const { cars, loading, errors } = useAppSelector((state) => state.userCar);

    const handleDelete = (id: number) => {
        dispatch(userCarDelete({ id }));
    };

    useEffect(() => {
        dispatch(userCarAll());
    }, [dispatch]);

    return (
        <Box sx={{ maxWidth: 600, mt: 4 }}>
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {errors.carNumber && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.carNumber}
                </Alert>
            )}

            {!loading && !errors.carNumber && cars?.length === 0 && (
                <Alert severity="info">Нет добавленных автомобилей.</Alert>
            )}

            {!loading && !errors.carNumber && cars?.length > 0 && (
                <List  sx={{ bgcolor: 'secondary.light', borderRadius: 2, boxShadow: 3, py:0,  overflowY: 'auto'}}>
                    {cars.map((car, index) => (
                        <Box key={car.id}>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(car.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                                sx={{
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}>
                                <ListItemText primary={<Typography variant="h5" >{car.carNumber}</Typography>} />
                            </ListItem>
                            {index < cars.length - 1 && <Divider />}
                        </Box>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default UserCarList;
