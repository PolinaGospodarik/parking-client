import { ChangeEvent } from 'react';
import {  MenuItem, FormHelperText, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';

type AutocompleteInputProps = {
    label: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void; // Обновим тип
    error?: string;
    name: string;
    options: string[];
    className?: string;
};

const AutocompleteInput = ({label, value, handleChange, error, name, options, className,}: AutocompleteInputProps) => {

    const handleSelect = (e: SelectChangeEvent<string>) => { // Обновим тип для SelectChangeEvent
        const { value } = e.target;
        handleChange({
            target: { name, value }
        } as ChangeEvent<HTMLInputElement>);
    };

    return (
        <FormControl fullWidth error={Boolean(error)} sx={{ mb: 2 }}>
            <InputLabel
                sx={{
                    fontSize: '16px',
                    fontFamily: 'Nunito',
                    fontWeight: 700,
                    color: '#232323',
                    width:  "60%",
                }}
            >{label}</InputLabel>
            <Select
                label={label}
                name={name}
                value={value}
                onChange={handleSelect}
                className={className}
                sx={{
                    '& .MuiMenuItem-root': {
                        fontFamily: 'Nunito',
                        fontSize: '18px',
                        fontWeight: 600,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '10px',
                    },

                }}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ minHeight: '18px' }}>
                {error || ' '} {/* Пустой пробел — чтобы зарезервировать место */}
            </FormHelperText>
        </FormControl>
    );
};

export default AutocompleteInput;
