import { TextField, TextFieldProps } from '@mui/material';

const InputField = ({ sx, ...props }: TextFieldProps) => {
    return (
        <TextField
            {...props}
            fullWidth={props.fullWidth ?? true}
            error={Boolean(props.error)}
            helperText={props.helperText}
            sx={{
                mb: 1,
                '& input': {
                    borderRadius: '10px',
                    border: '2px',
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
                    fontSize: '16px',
                    fontWeight: 700,
                    fontFamily: 'Nunito',
                },
                ...sx, // <-- позволяет переопределять стиль при необходимости
            }}
        />
    );
};

export default InputField;
