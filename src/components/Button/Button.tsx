import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import styles from "./Button.module.scss"

type ButtonProps = {
    variant?:  'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
    className?: string;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
} & MUIButtonProps;

const Button = ({
                    variant = 'contained',
                    size = 'medium',
                    color = 'primary',
                    className,
                    children,
                    type = 'button',
                    fullWidth = false,
                    ...props
                }: ButtonProps) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${className || ''}`;
    return (
        <MUIButton
            className={buttonClass}
            variant={variant}
            color={color}
            size={size}
            type={type}
            fullWidth={fullWidth}
            {...props}
        >
            {children}
        </MUIButton>
    );
};

export default Button;
