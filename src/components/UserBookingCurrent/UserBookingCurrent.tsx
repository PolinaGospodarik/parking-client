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
import { userBookingCurrent } from '../../redux/slice/userBookingSlice.ts';
import dayjs from 'dayjs';

const UserCurrentBooking = () => {
    const dispatch = useAppDispatch();
    const { current, loading, error } = useAppSelector((state) => state.userBooking);

    useEffect(() => {
        dispatch(userBookingCurrent());
    }, [dispatch]);

    const isCurrentEmpty = !loading && !current;
    const isCurrentLoaded = !loading && !!current;

    return (
        <Box sx={{ pt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Текущее бронирование
            </Typography>

            {loading && <CircularProgress />}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {isCurrentEmpty && (
                <Typography>Активных бронирований нет.</Typography>
            )}

            {isCurrentLoaded && current && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                    <Card key={current.id} sx={{ width: '100%', maxWidth: 350 }}>
                        <CardContent>
                            <Typography variant="subtitle1">
                                Номер машины: {current.car?.carNumber || `ID: ${current.carId}`}
                            </Typography>
                            <Typography variant="body2">
                                Место: {current.placeNumber}
                            </Typography>
                            <Typography variant="body2">
                                С: {dayjs(current.startTime).format('DD.MM.YYYY HH:mm')}
                            </Typography>
                            <Typography variant="body2">
                                До: {dayjs(current.endTime).format('DD.MM.YYYY HH:mm')}
                            </Typography>
                            <Typography variant="body2">
                                Статус: {current.status}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default UserCurrentBooking;
