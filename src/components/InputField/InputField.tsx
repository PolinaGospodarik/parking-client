import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

type InputFieldProps = {
    label: string;
    type: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    name: string;
    placeholder: string;
    className?: string;
    fullWidth?: boolean;
};

const InputField = ({
                        label,
                        type,
                        value,
                        handleChange,
                        error,
                        name,
                        placeholder,
                        className,
                        fullWidth,
                    }: InputFieldProps) => {
    return (
        <TextField
            className={className}
            label={label}
            type={type}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            variant="outlined"
            fullWidth={fullWidth}
            error={Boolean(error?.trim())}
            helperText={error || ' '}
            sx={{
                mb: 1,
                '& input': {
                    borderRadius: '10px',
                    border: "2px",
                    backgroundColor: 'transparent',
                    fontSize: '16px',
                    fontWeight: 700,
                    fontFamily: 'Nunito',
                },
                '& input::placeholder': {
                    fontSize: '14px',
                },
                '& .MuiInputBase-root': {
                    borderRadius: '10px',
                },
                '& .MuiFormLabel-root': {
                    fontSize:"16px",
                    fontWeight: 700,
                    fontFamily: 'Nunito',
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '10px',
                    fontFamily: 'Nunito',
                    color: 'error.main',
                    fontWeight: 600,
                    minHeight: '16px',
                    marginTop: '4px'
                },
            }}
        />
    );
};

export default InputField;
