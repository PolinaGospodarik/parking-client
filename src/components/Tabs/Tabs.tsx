import * as React from 'react';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const tabRoutes = [
    { label: 'Список пользователей', path: 'userList' },
    { label: 'Создание пользователя', path: 'registration' },
    { label: 'Карта', path: 'map' }, // если карты ещё нет — можно временно убрать
];

const DynamicTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = React.useMemo(() => {
        const match = tabRoutes.find(tab => location.pathname.includes(tab.path));
        return match ? tabRoutes.indexOf(match).toString() : '0';
    }, [location.pathname]);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        navigate(tabRoutes[Number(newValue)].path);
    };

    return (
        <TabContext value={currentTab}>
            <Box sx={{ position: 'relative', zIndex: 0 }}>
                <TabList onChange={handleChange} aria-label="navigation tabs">
                    {tabRoutes.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            value={`${index}`}
                            sx={{ backgroundColor: "#008A5E", color: "#FFF" }}
                        />
                    ))}
                </TabList>
            </Box>
        </TabContext>
    );
};

export default DynamicTabs;
