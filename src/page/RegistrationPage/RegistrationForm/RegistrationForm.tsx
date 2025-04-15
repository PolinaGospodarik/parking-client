import styles from "./RegistrationForm.module.scss";
import InputField from "../../../components/InputField/InputField.tsx";
import Button from "../../../components/Button/Button.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch} from "../../../hook.ts";
import {registration} from "../../../redux/slice/registrationSlice.ts";
import AutocompleteInput from "./AutocompleteInput/AutocompleteInput.tsx";
import {Box, Typography} from "@mui/material";


const RegistrationForm = () => {
    const [fullName, setFullName] = useState("");
    const [tel, setTel] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({ fullName: "", tel: "", role: "" });
    const [generatedPassword, setGeneratedPassword] = useState("");

    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "fullName") {
            setFullName(value);
        } else if (name === "tel") {
            setTel(value);
        }else if (name === "role"){
            setRole(value);
        }
    };

    const handleSubmit =  async (e: FormEvent) => {
        e.preventDefault();

        const newErrors = { fullName: "", tel: "" , role: ""};
        if (!fullName) newErrors.fullName = "Телефон обязателен!";
        if (!tel) newErrors.tel = "Пароль обязателен!";
        if (!role) newErrors.role = "Роль обязательна!";
        setErrors(newErrors);

        if (!newErrors.fullName && !newErrors.tel && !newErrors.role) {
            try {
                const result = await dispatch(registration({ fullName, tel, role })).unwrap();
                setGeneratedPassword(result);
            } catch (error) {
                console.error("Ошибка при регистрации:", error);
            }
        }
    };

    return (
        <>
            <Box sx={{p: '50px 0'}}>
                <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
                    <Typography variant="h1">Создание пользователя</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box>
                            <InputField
                                label="ФИО"
                                type="text"
                                value={fullName}
                                handleChange={handleChange}
                                name="fullName"
                                error={errors.fullName}
                                placeholder="Введите ваше ФИО"
                                className={styles.input}
                                fullWidth={true}
                            />
                            <InputField
                                label="Телефон"
                                type="tel"
                                value={tel}
                                handleChange={handleChange}
                                name="tel"
                                error={errors.tel}
                                placeholder="Введите a номер телефона"
                                className={styles.input}
                                fullWidth={true}
                            />
                            <AutocompleteInput
                                label="Роль"
                                value={role}
                                handleChange={handleChange}
                                name="role"
                                error={errors.role}
                                options={["USER", "ADMIN", "GUARD"]}
                                className={styles.input}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <InputField
                                    label="Сгенерированный пароль"
                                    type="text"
                                    value={generatedPassword}
                                    handleChange={() => {}}
                                    name="generatedPassword"
                                    placeholder=""
                                    className={styles.generatedPassword}
                                    fullWidth={false}
                                />
                                <Box><Button className={styles.passwordButton} variant="contained" size="medium" type="button">Печать</Button></Box>
                            </Box>
                        </Box>
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Зарегистрировать</Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default RegistrationForm;