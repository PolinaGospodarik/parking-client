import InputField from "../../../components/InputField/InputField.tsx";
import {useAppDispatch} from "../../../hook.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import { login } from "../../../redux/slice/loginSlice.ts";
import Button from "../../../components/Button/Button.tsx";
import {Box, Typography, Alert, Collapse} from "@mui/material";

const phonePattern = /^\+375\s?\(?\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

const LoginForm = () => {
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ tel: "", password: "" });

    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "tel") {
            setTel(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newErrors = { tel: "", password: "" };

        if (!tel) {
            newErrors.tel = "Телефон обязателен!";
        } else if (!phonePattern.test(tel)) {
            newErrors.tel = "Неверный формат телефона!";
        }

        if (!password) newErrors.password = "Пароль обязателен!";
        setErrors(newErrors);

        if (!newErrors.tel && !newErrors.password) {
            dispatch(login({ tel, password }));
        }
    };

    return (
        <>
            <Box sx={{ maxWidth: 400, width: "100%", px: "20px" }}>
                <Typography variant="h4" mb="35px" sx={{ textAlign: "left" }}>
                    Вход
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 1 }}>
                        <InputField
                            label="Телефон"
                            type="tel"
                            value={tel}
                            onChange={handleChange}
                            name="tel"
                            error={Boolean(errors.tel)}
                            placeholder="Введите ваш номер телефона"
                            fullWidth={true}
                        />
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <InputField
                            label="Пароль"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            name="password"
                            error={Boolean(errors.password)}
                            placeholder="Введите ваш пароль"
                            fullWidth={true}
                        />
                    </Box>
                    <Button variant="contained" size="large" type="submit" fullWidth>
                        Войти
                    </Button>
                </form>

                {/* Ошибки показываются только если есть */}
                <Collapse in={Boolean(errors.tel)}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errors.tel}
                    </Alert>
                </Collapse>

                <Collapse in={Boolean(errors.password)}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errors.password}
                    </Alert>
                </Collapse>
            </Box>
        </>
    );
};

export default LoginForm;
