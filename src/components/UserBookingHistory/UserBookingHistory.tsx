import { useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hook.ts';
import { userBookingHistory } from '../../redux/slice/userBookingSlice.ts';
import dayjs from 'dayjs';

const UserBookingHistory = () => {
    const dispatch = useAppDispatch();
    const { history, loading, error } = useAppSelector((state) => state.userBooking);

    useEffect(() => {
        dispatch(userBookingHistory());
    }, [dispatch]);

    const isHistoryEmpty = !loading && (!history || history.length === 0);
    const isHistoryLoaded = !loading && Array.isArray(history) && history.length > 0;

    return (
        <Box sx={{ pt: 3 }}>
            <Typography variant="h5" gutterBottom>
                История бронирований
            </Typography>

            {loading && <CircularProgress />}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {isHistoryEmpty && (
                <Typography>Бронирований пока нет.</Typography>
            )}

            {isHistoryLoaded && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                    {history.map((item) => (
                        <Card key={item.id} sx={{ width: '100%', maxWidth: 350 }}>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    Номер машины: {item.car?.carNumber || `ID: ${item.carId}`}
                                </Typography>
                                <Typography variant="body2">
                                    Место: {item.placeNumber}
                                </Typography>
                                <Typography variant="body2">
                                    С: {dayjs(item.startTime).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                                <Typography variant="body2">
                                    До: {dayjs(item.endTime).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                                <Typography variant="body2">
                                    Статус: {item.status}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Создано: {dayjs(item.createdAt).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default UserBookingHistory;
