import { useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    IconButton,
    Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../hook.ts';
import {
    userBookingFeature,
    userBookingDelete
} from '../../redux/slice/userBookingSlice.ts';

const FeatureBookingList = () => {
    const dispatch = useAppDispatch();
    const { feature, loading, error } = useAppSelector((state) => state.userBooking);

    useEffect(() => {
        dispatch(userBookingFeature());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        dispatch(userBookingDelete({ id }))
    };

    const isEmpty = !loading && (!feature || feature.length === 0);
    const isLoaded = !loading && Array.isArray(feature) && feature.length > 0;

    return (
        <Box sx={{ pt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Будущие бронирования
            </Typography>

            {loading && <CircularProgress />}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {isEmpty && (
                <Typography>Нет будущих бронирований.</Typography>
            )}

            {isLoaded && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                    {feature.map((booking) => (
                        <Card
                            key={booking.id}
                            sx={{
                                width: '100%',
                                maxWidth: 350,
                                position: 'relative',
                                paddingRight: 5,
                            }}
                        >
                            <CardContent>
                                <Tooltip title="Удалить бронирование">
                                    <IconButton
                                        onClick={() => handleDelete(booking.id)}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            color: "rgba(0, 0, 0, 0.54)"
                                        }}
                                        color="error"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                                <Typography variant="subtitle1">
                                    Номер машины: {booking.car?.carNumber || `ID: ${booking.carId}`}
                                </Typography>
                                <Typography variant="body2">
                                    Место: {booking.placeNumber}
                                </Typography>
                                <Typography variant="body2">
                                    С: {dayjs(booking.startTime).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                                <Typography variant="body2">
                                    До: {dayjs(booking.endTime).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                                <Typography variant="body2">
                                    Статус: {booking.status}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Создано: {dayjs(booking.createdAt).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default FeatureBookingList;
