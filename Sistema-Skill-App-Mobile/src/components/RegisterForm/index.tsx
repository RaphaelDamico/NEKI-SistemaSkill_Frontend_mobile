import { View, Text } from "react-native";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useRegisterUser } from "../../contexts/RegisterUserContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { RootPublicStackParamList } from "../../interfaces";
import LoadingIcon from "../LoadingIcon";
import { signupUser } from "../../api";


export default function RegisterForm({ navigation }: { navigation: NavigationProp<RootPublicStackParamList> }) {
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        setLoading
    } = useRegisterUser();

    const validatePassword = (password: string) => {
        const regexp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
        return regexp.test(password);
    };


    const registerUser = async () => {
        if (password !== confirmPassword) {
            setHasError(true);
            setErrorMessage("As senhas não correspondem");
            return;
        }

        if (!validatePassword(password)) {
            setHasError(true);
            setErrorMessage("A senha deve ter 8-30 caracteres, com uma letra maiúscula, um número e um caractere especial.");
            return;
        }
        setHasError(false);
        setErrorMessage("");
        setLoading(true);
        try {
            await signupUser({ username, password });
            navigation.navigate("LoginScreen");
        } catch (error: unknown) {
            if (error instanceof Error && error.message === "Este nome de usuário já existe") {
                setHasError(true);
                setErrorMessage(error.message);
            } else {
                console.error("Registro do usuário falhou", error);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.formContainer}>
            <View
                style={styles.formContent}
            >
                <Input
                    label="Usuario"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Digite seu nome de usuario"
                    id="username"
                    type="text" />
                <Input
                    label="Senha"
                    hasIcon
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Digite sua senha"
                    type="password" />
                <Input
                    label="Confirmar senha"
                    hasIcon
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholder="Digite sua senha"
                    type="password"
                />
                {hasError &&
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorSpan}>{errorMessage}</Text>
                    </View>
                }
                <Button
                    content={loading ? <LoadingIcon /> : "Cadastrar"}
                    onPress={() => {registerUser()}}
                    backgroundColor={"#1A374B"}
                />
                <Button
                    content={"Cancelar"}
                    onPress={() => { navigation.navigate("LoginScreen") }}
                    backgroundColor={"#4EB888"}
                />
            </View>
        </View>
    );
}