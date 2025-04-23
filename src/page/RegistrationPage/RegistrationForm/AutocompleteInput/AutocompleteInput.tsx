import { ChangeEvent } from 'react';
import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Collapse,
    Alert,
} from '@mui/material';

type AutocompleteInputProps = {
    label: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    name: string;
    options: string[];
    className?: string;
};

const AutocompleteInput = ({label, value, handleChange, error, name, options, className,}: AutocompleteInputProps) => {
    const handleSelect = (e: SelectChangeEvent<string>) => {
        const { value } = e.target;
        handleChange({
            target: { name, value }
        } as ChangeEvent<HTMLInputElement>);
    };

    return (
        <>
            <FormControl fullWidth error={Boolean(error)} sx={{ mb: 1 }}>
                <InputLabel
                    sx={{
                        fontSize: '16px',
                        fontFamily: 'Nunito',
                        fontWeight: 700,
                        color: '#232323',
                        width: "60%",
                    }}
                >
                    {label}
                </InputLabel>
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
            </FormControl>

            <Collapse in={Boolean(error)}>
                <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
                    {error}
                </Alert>
            </Collapse>
        </>
    );
};

export default AutocompleteInput;
