import * as React from 'react';
import { useEffect } from 'react';
import { AppProvider, Navigation, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import theme from '../../common/theme/theme.ts';
import Logo from '../Header/Logo/Logo.tsx';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HistoryIcon from '@mui/icons-material/History';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

import { signOut, userGet } from '../../redux/slice/loginSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hook.ts';


const NAVIGATION: Navigation = [
    {
        segment: 'user/parking',
        title: 'Мои парковки',
        icon: <LocalParkingIcon />,
    },
    {
        segment: 'user/booking',
        title: 'Бронирование',
        icon: <CalendarMonthIcon />,
    },
    {
        segment: 'user/car',
        title: 'Мои машины',
        icon: <DirectionsCarIcon />,
    },
    {
        segment: 'user/history',
        title: 'История',
        icon: <HistoryIcon />,
    },
];

export default function DashboardLayoutBasic() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.login.user);

    useEffect(() => {
        dispatch(userGet());
    }, [dispatch]);

    const router = React.useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path: string | URL) => navigate(String(path)),
        };
    }, [location, navigate]);

    const handleSignOut = () => {
        dispatch(signOut());
        navigate('/login');
    };

    const session: Session | null = user
        ? {
            user: {
                name: user.fullName,
                email: user.phoneNumber,
                image:  '',
            },
        }
        : null;

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                dispatch(userGet());
            },
            signOut: () => {
                handleSignOut();
            },
        };
    }, [dispatch]);

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={NAVIGATION}
            branding={{
                logo: <Logo />,
                title: 'Парковка БНТУ',
                homeUrl: '/',
            }}
            router={router}
            theme={theme}
        >
            <DashboardLayout sx={{ backgroundColor: 'secondary.light' }}>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
