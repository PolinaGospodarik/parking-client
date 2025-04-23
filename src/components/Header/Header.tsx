import { useEffect, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';

import Logo from './Logo/Logo.tsx';
import DynamicTabs from '../Tabs/Tabs.tsx';
import { signOut, userGet } from '../../redux/slice/loginSlice.ts';

import { useAppDispatch, useAppSelector } from "../../hook.ts";
import { AppProvider, Session } from "@toolpad/core/AppProvider";
import { Account } from "@toolpad/core";
import { createTheme } from '@mui/material/styles';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.login.user);

    useEffect(() => {
        dispatch(userGet());
    }, [dispatch]);

    const handleSignOut = () => {
        dispatch(signOut());
        navigate('/login');
    };

    const session: Session | null = user
        ? {
            user: {
                name: user.fullName,
                email: user.phoneNumber,
                image: '',
            },
        }
        : null;

    const authentication = useMemo(() => ({
        signIn: () => dispatch(userGet()),
        signOut: handleSignOut,
    }), [dispatch]);

    // 👉 Только светлая тема
    const lightOnlyTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    return (
        <>
            <Box sx={{ backgroundColor: 'primary.main', py: 1 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Logo/>
                        <DynamicTabs/>
                        <AppProvider
                            authentication={authentication}
                            session={session}
                            theme={lightOnlyTheme}
                        >
                            <Account/>
                        </AppProvider>
                    </Box>
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Outlet/>
            </Container>
        </>
    );
};

export default Header;
