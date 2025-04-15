import InputField from "../../../components/InputField/InputField.tsx";
import {useAppDispatch} from "../../../hook.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {login} from "../../../redux/slice/loginSlice.ts";
import Button from "../../../components/Button/Button.tsx";
import {Box, Typography} from "@mui/material";

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
        if (!tel) newErrors.tel = "Телефон обязателен!";
        if (!password) newErrors.password = "Пароль обязателен!";
        setErrors(newErrors);

        if (!newErrors.tel && !newErrors.password) {
            dispatch(login({ tel, password }));
        }
    };

    return (
        <>
            <Box sx={{ maxWidth: 400, width: "100%" }}>
                <Typography variant="h1" sx={{ textAlign: 'left' }}>Вход</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 1 }}>
                        <InputField
                            label="Телефон"
                            type="tel"
                            value={tel}
                            handleChange={handleChange}
                            name="tel"
                            error={errors.tel}
                            placeholder="Введите ваш номер телефона"
                            fullWidth={true}
                        />
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <InputField
                            label="Пароль"
                            type="password"
                            value={password}
                            handleChange={handleChange}
                            name="password"
                            error={errors.password}
                            placeholder="Введите ваш пароль"
                            fullWidth={true}
                        />
                    </Box>
                    <Button variant="contained" size="large" type="submit" fullWidth>Войти</Button>
                </form>
            </Box>
        </>
    );
};

export default LoginForm;