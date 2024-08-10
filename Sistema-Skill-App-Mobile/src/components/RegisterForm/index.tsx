import { View, Text } from "react-native";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useRegisterUser } from "../../contexts/RegisterUserContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from "./styles";


export default function RegisterForm() {
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

    return (
        <View style={styles.formContainer}>
            <View
                style={styles.formContent}
            >
                <Input
                    label="Login"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Digite seu nome de usuario"
                    id="username"
                />
                <Input
                    label="Senha"
                    hasIcon
                    value={password}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Digite sua senha"
                    id="password"
                />
                <Input
                    label="Confirmar senha"
                    hasIcon
                    value={confirmPassword}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Digite sua senha"
                    id="password"
                />
                {hasError &&
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorSpan}>{errorMessage}</Text>
                    </View>
                }
                <Button
                    content={loading ? <AntDesign name="loading1" size={24} color="#F9F9F9" /> : "Entrar"}
                    onPress={() => { }}
                    backgroundColor={"#1A374B"}
                />
                <Button
                    content={"Cadastrar"}
                    onPress={() => { }}
                    backgroundColor={"#4EB888"}
                />
            </View>
        </View>
    );
}