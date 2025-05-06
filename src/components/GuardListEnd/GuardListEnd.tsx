import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook.ts";
import { guardGetEnd } from "../../redux/slice/guardSlice.ts";
import {
    Button,
    CircularProgress,
    Typography,
    Alert,
    TextField,
    Box,
    Card,
    CardContent,
} from "@mui/material";

const BookingEndInfo = () => {
    const dispatch = useAppDispatch();
    const { bookingEnd, loading, error } = useAppSelector((state) => state.guard);

    const [carNumber, setCarNumber] = useState("");

    const handleSubmit = () => {
        if (carNumber.trim()) {
            dispatch(guardGetEnd(carNumber));
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
                onClick={handleSubmit}
                disabled={loading}
                fullWidth
            >
                Завершить бронирование
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

            {bookingEnd && (
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Бронирование завершено
                        </Typography>
                        <Typography>Номер машины: {carNumber}</Typography>
                        <Typography>ID бронирования: {bookingEnd.id}</Typography>
                        <Typography>Место: {bookingEnd.placeNumber}</Typography>
                        <Typography>Статус: {bookingEnd.status}</Typography>
                        <Typography>
                            Начало:{" "}
                            {new Date(bookingEnd.actualStartTime || "").toLocaleString()}
                        </Typography>
                        <Typography>
                            Конец:{" "}
                            {new Date(bookingEnd.actualEndTime || "").toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default BookingEndInfo;
