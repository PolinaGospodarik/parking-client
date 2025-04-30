import React, { useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { admin } from '../../redux/slice/adminSlice.ts';
import { useAppDispatch, useAppSelector } from "../../hook.ts";
import { Booking, User } from "../../redux/slice/adminSlice.ts";

const AdminAccordion = () =>{
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector(state => state.admin);
    const [expanded, setExpanded] = React.useState<number | false>(false);
    const [tabIndex, setTabIndex] = React.useState<{ [key: number]: number }>({});

    useEffect(() => {
        dispatch(admin());
    }, [dispatch]);

    const handleAccordionChange = (panel: number) => {
        setExpanded(prev => (prev === panel ? false : panel));
    };

    const handleTabChange = (userId: number, newIndex: number) => {
        setTabIndex(prev => ({ ...prev, [userId]: newIndex }));
    };

    const getBookingsByCarId = (user: User, carId: number): Booking[] => {
        return user.allBookings.filter((booking: Booking) => booking.carId === carId);
    };

    if (loading) return <Typography>Загрузка...</Typography>;

    return (
        <Box>
            {users.map((user, index) => (
                <Accordion
                    key={user.id}
                    expanded={expanded === index}
                    onChange={() => handleAccordionChange(index)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box display="flex" justifyContent="space-between" width="100%" sx={{ px: 1 }}>
                            <Typography variant="h5" sx={{ flex: 5 }}>{user.fullName}</Typography>
                            <Typography variant="h5" sx={{ flex: 1 }}>{user.phoneNumber}</Typography>
                            <Typography variant="h5" sx={{ flex: 1, textAlign: 'right' }}>{user.role}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box display="flex">
                            <Box sx={{ minWidth: 150, borderRight: 1, borderColor: 'divider' }}>
                                <Typography variant="h5" sx={{ px: 1 }}>АВТО</Typography>
                                <Tabs
                                    sx={{ pr: 2, pt: 1 }}
                                    orientation="vertical"
                                    value={tabIndex[user.id] || 0}
                                    onChange={(_, newValue) => handleTabChange(user.id, newValue)}
                                >
                                    <Tab label="Все авто" />
                                    {user.cars.map((car) => (
                                        <Tab key={car.id} label={car.carNumber} />
                                    ))}
                                </Tabs>
                            </Box>
                            <Box sx={{ flexGrow: 1, px: 2 }}>
                                <Typography variant="h5" sx={{ pb: 2 }}>ИСТОРИЯ</Typography>
                                {tabIndex[user.id] === 0 ? (
                                    <Table component={Paper} sx={{ backgroundColor: "secondary.light" }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID машины</TableCell>
                                                <TableCell>Номер</TableCell>
                                                <TableCell>Бронирование ID</TableCell>
                                                <TableCell>Место</TableCell>
                                                <TableCell>Начало</TableCell>
                                                <TableCell>Конец</TableCell>
                                                <TableCell>Статус</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {user.cars.map(car =>
                                                user.allBookings
                                                    .filter(booking => booking.carId === car.id)
                                                    .map((booking: Booking) => (
                                                        <TableRow key={booking.id}>
                                                            <TableCell>{car.id}</TableCell>
                                                            <TableCell>{car.carNumber}</TableCell>
                                                            <TableCell>{booking.id}</TableCell>
                                                            <TableCell>{booking.placeNumber}</TableCell>
                                                            <TableCell>{booking.startTime}</TableCell>
                                                            <TableCell>{booking.endTime}</TableCell>
                                                            <TableCell>{booking.status}</TableCell>
                                                        </TableRow>
                                                    ))
                                            )}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <Table component={Paper}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID брони</TableCell>
                                                <TableCell>Место</TableCell>
                                                <TableCell>Начало</TableCell>
                                                <TableCell>Конец</TableCell>
                                                <TableCell>Статус</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {getBookingsByCarId(user, user.cars[tabIndex[user.id] - 1]?.id).map((booking: Booking) => (
                                                <TableRow key={booking.id}>
                                                    <TableCell>{booking.id}</TableCell>
                                                    <TableCell>{booking.placeNumber}</TableCell>
                                                    <TableCell>{booking.startTime}</TableCell>
                                                    <TableCell>{booking.endTime}</TableCell>
                                                    <TableCell>{booking.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
export default AdminAccordion;
