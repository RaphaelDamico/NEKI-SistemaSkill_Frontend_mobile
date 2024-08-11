import { View, Text } from "react-native";
import { styles } from "./styles";
import Input from "../Input";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useEffect, useState } from "react";
import CustomCheckbox from "../Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Button";
import { NavigationProp } from "@react-navigation/native";
import { RootPublicStackParamList } from "../../interfaces";
import LoadingIcon from "../LoadingIcon";

export default function LoginForm({ navigation }: { navigation: NavigationProp<RootPublicStackParamList> }) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);

    const {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        loginUser
    } = useAuthUser();

    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const savedUsername = await AsyncStorage.getItem("savedUsername");
                const savedPassword = await AsyncStorage.getItem("savedPassword");

                if (savedUsername) {
                    setUsername(savedUsername);
                    setIsChecked(true);
                }
                if (savedPassword) {
                    setPassword(savedPassword);
                    setIsChecked(true);
                }
            } catch (error) {
                console.error("Erro ao carregar as credenciais salvas:", error);
            }
        };

        loadCredentials();
    }, [setUsername, setPassword]);

    const saveCredentials = async () => {
        if (isChecked) {
            try {
                await AsyncStorage.setItem("savedUsername", username);
                await AsyncStorage.setItem("savedPassword", password);
            } catch (error) {
                console.log('Erro ao salvar username e senha:', error);
            }
        } else {
            try {
                await AsyncStorage.removeItem("savedUsername");
                await AsyncStorage.removeItem("savedPassword");
            } catch (error) {
                console.log('Erro ao remover username e senha:', error);
            }
        }
    };

    const handleLogin = async () => {
        setErrorMessage("");
        try {
            await loginUser();
            await saveCredentials();
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message === "Login ou senha incorretos, verifique suas credenciais") {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("Falha no login. Verifique suas credenciais e tente novamente.");
                }
                console.error("Falha no login", error);
            } else {
                setErrorMessage("Ocorreu um erro desconhecido");
                console.error("Erro desconhecido", error);
            }
        }
    };

    const handleCheckboxChange = async () => {
        setIsChecked(!isChecked);
        await saveCredentials();
    };
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
                    type="text"
                />
                <Input
                    label="Senha"
                    hasIcon
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Digite sua senha"
                    type="password"
                />
                <CustomCheckbox
                    label="Salvar senha"
                    value={isChecked}
                    onValueChange={handleCheckboxChange}
                />
                {errorMessage !== "" && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorSpan}>{errorMessage}</Text>
                    </View>
                )}
                <Button
                    content={loading ? <LoadingIcon /> : "Entrar"}
                    onPress={() => { handleLogin() }}
                    style={{ alignSelf: "center", backgroundColor: "#1A374B", width: "80%" }}
                />
                <Button
                    content={"Cadastrar"}
                    onPress={() => { navigation.navigate("RegisterScreen") }}
                    style={{ alignSelf: "center", backgroundColor: "#4EB888", width: "80%" }}
                />
            </View>
        </View>
    );
};