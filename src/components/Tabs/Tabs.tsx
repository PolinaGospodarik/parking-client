import * as React from 'react';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';

const tabData = [
    { label: 'Список пользователей' },
    { label: 'Создание пользователя' },
    { label: 'Карта' },
];

const MyTabs: React.FC = () => {
    const [value, setValue] = React.useState<string>('2');

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{p: 1, position: 'relative', zIndex: 0}}>
                <TabList onChange={handleChange} aria-label="dynamic tabs example">
                    {tabData.map((tab, index) => (
                        <Tab key={index} label={tab.label} value={`${index + 1}`} />
                    ))}
                </TabList>
            </Box>
        </TabContext>
    );
}

export default MyTabs;
