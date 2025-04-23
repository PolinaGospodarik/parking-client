import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook.ts";
import { userCarAll, userCarCreate } from "../../redux/slice/userCarSlice.ts";
import { Alert, Box, Collapse } from "@mui/material";
import Button from "../../components/Button/Button.tsx";
import InputField from "../InputField/InputField.tsx";

const AddCar = () => {
    const dispatch = useAppDispatch();
    const { loading, carNumber, errors } = useAppSelector((state) => state.userCar);

    const [inputValue, setInputValue] = useState("");
    const [localError, setLocalError] = useState("");

    const belarusCarNumberRegex = /^\d{4} [ABEIHKMOPCTX]{2}-[1-7]$/;

    const formatInput = (value: string): string => {
        const cleaned = value.replace(/\s|-/g, "").toUpperCase();

        const digits = cleaned.replace(/\D/g, "").slice(0, 4);
        const letters = cleaned.slice(4, 6).replace(/[^ABEIHKMOPCTX]/gi, "");
        const lastDigit = cleaned.slice(6, 7).replace(/[^1-7]/, "");

        let result = digits;
        if (letters.length > 0) result += " " + letters;
        if (lastDigit) result += "-" + lastDigit;

        return result;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatInput(e.target.value);
        setInputValue(formatted);
        setLocalError(""); // очищаем локальную ошибку при изменении
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!belarusCarNumberRegex.test(inputValue)) {
            setLocalError("Неверный формат номера. Пример: 1234 АБ-7");
            return;
        }

        try {
            const result = await dispatch(userCarCreate({ carNumber: inputValue }));

            if (userCarCreate.fulfilled.match(result)) {
                dispatch(userCarAll());
            } else {
                setLocalError("Не удалось добавить машину");
            }
        } catch (error) {
            setLocalError("Произошла ошибка при добавлении машины");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
            <InputField
                fullWidth
                label="Номер машины"
                variant="outlined"
                placeholder="1234 АБ-7"
                value={inputValue}
                onChange={handleChange}
                disabled={loading}
                margin="normal"
                error={Boolean(localError || errors?.carNumber)}
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                Добавить
            </Button>

            {/* Локальная ошибка */}
            <Collapse in={Boolean(localError)}>
                <Alert severity="error" sx={{ mt: 2 }}>
                    {localError}
                </Alert>
            </Collapse>

            {/* Глобальная ошибка для carNumber */}
            <Collapse in={Boolean(errors?.carNumber)}>
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.carNumber}
                </Alert>
            </Collapse>

            {/* Успешный результат */}
            <Collapse in={Boolean(carNumber)}>
                <Alert severity="success" sx={{ mt: 2 }}>
                    Добавлена машина: {carNumber}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default AddCar;
