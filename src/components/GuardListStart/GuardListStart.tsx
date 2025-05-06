import { useState } from "react";
import {
    Button,
    Typography,
    Box,
    CircularProgress,
    TextField,
    Alert,
} from "@mui/material";
import { guardGetStart } from "../../redux/slice/guardSlice";
import { useAppDispatch, useAppSelector } from "../../hook";

const AllowEntryComponent = () => {
    const dispatch = useAppDispatch();
    const { bookingStart, loading, error } = useAppSelector((state) => state.guard);

    const [carNumber, setCarNumber] = useState("");

    const handleAllowEntry = () => {
        if (carNumber.trim()) {
            dispatch(guardGetStart(carNumber));
        }
    };

    return (
        <Box sx={{ py: 2, maxWidth: 500}}>
            <TextField
                fullWidth
                label="Номер машины"
                variant="outlined"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleAllowEntry}
                disabled={loading}
                fullWidth
            >
                Разрешить въезд
            </Button>

            {loading && (
                <Box mt={2} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {bookingStart && (
                <Box mt={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
                    <Typography variant="h6">Бронирование ID: {bookingStart.id}</Typography>
                    <Typography>Статус: {bookingStart.status}</Typography>
                    <Typography>Место: {bookingStart.placeNumber}</Typography>
                    <Typography>
                        Начало: {new Date(bookingStart.startTime).toLocaleString()}
                    </Typography>
                    <Typography>
                        Конец: {new Date(bookingStart.endTime).toLocaleString()}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default AllowEntryComponent;
