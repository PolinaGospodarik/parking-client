import { useState, useEffect } from 'react';
import {adminSearch} from '../../redux/slice/adminSlice.ts';
import { TextField, CircularProgress, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../hook.ts";

const Search = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState('');
    const { users, loading, error } = useAppSelector((state) => state.admin);


    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(adminSearch(query));
        }, 300);

        return () => clearTimeout(timer);
    }, [query, dispatch]);

    return (
        <Box sx={{ maxWidth: "100%", margin: '0 auto' }}>
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    label="Поиск"
                    variant="outlined"
                    placeholder="Введите имя, телефон или номер машины"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {/*<List>*/}
            {/*    {users.map((user) => (*/}
            {/*        <ListItem key={user.id} divider>*/}
            {/*            <ListItemText*/}
            {/*                primary={user.fullName}*/}
            {/*                secondary={`Телефон: ${user.phoneNumber}`}*/}
            {/*            />*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*</List>*/}

            {!loading && users.length === 0 && query.trim() && (
                <Typography sx={{ mt: 2 }} color="text.secondary">
                    Пользователи не найдены.
                </Typography>
            )}
        </Box>
    );
}

export default Search;