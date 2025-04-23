import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

import { useAppDispatch, useAppSelector } from "../../hook.ts";
import { userCarAll } from "../../redux/slice/userCarSlice.ts";
import {userBookingCreate, userBookingFeature} from "../../redux/slice/userBookingSlice.ts";

const BookingForm = () => {

    const dispatch = useAppDispatch();
    const { cars, loading: carLoading } = useAppSelector((state) => state.userCar);
    const { loading: bookingLoading, error, booking } = useAppSelector((state) => state.userBooking);

    const [selectedCar, setSelectedCar] = useState<number | "">("");
    const [from, setFrom] = useState<Dayjs | undefined>(dayjs());
    const [to, setTo] = useState<Dayjs | undefined>(dayjs().add(1, 'hour'));

    useEffect(() => {
        dispatch(userCarAll());
    }, [dispatch]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCar || !from || !to) return;

        dispatch(userBookingCreate({
            carId: selectedCar,
            from: from.format(),
            to: to.format(),
        }))
            .unwrap()
            .then(() => {
                dispatch(userBookingFeature());
            })
            .catch((err) => {
                console.error("Ошибка при создании бронирования:", err);
            });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ maxWidth: 500, p: 3, boxShadow: 3, borderRadius: 2 }}
            >
                <Typography variant="h5" mb={2}>Создание бронирования</Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="car-select-label">Выберите автомобиль</InputLabel>
                    <Select
                        labelId="car-select-label"
                        value={selectedCar}
                        label="Выберите автомобиль"
                        onChange={(e) => setSelectedCar(Number(e.target.value))}
                        disabled={carLoading}
                    >
                        {cars.map((car) => (
                            <MenuItem key={car.id} value={car.id}>
                                {car.carNumber}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <DateTimePicker
                    label="С (от)"
                    value={from}
                    onChange={(value) => setFrom(value ?? undefined)}
                    disablePast
                    ampm={false}
                    sx={{
                        mb: 2,
                        width: '100%',
                    }}
                />

                <DateTimePicker
                    label="До"
                    value={to}
                    onChange={(value) => setTo(value ?? undefined)}
                    disablePast
                    ampm={false}
                    minDateTime={from}
                    sx={{ mb: 2, width: '100%' }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={bookingLoading || !selectedCar || !from || !to}
                >
                    {bookingLoading ? <CircularProgress size={24} /> : "Забронировать"}
                </Button>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {booking && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Бронирование создано! Место: {booking.placeNumber}
                    </Alert>
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default BookingForm;
