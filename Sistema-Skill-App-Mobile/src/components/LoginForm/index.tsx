import { View, Text } from "react-native";
import { styles } from "./styles";
import Input from "../Input";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useEffect, useState } from "react";
import CustomCheckbox from "../Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Button";
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp } from "@react-navigation/native";
import { RootPublicStackParamList } from "../../interfaces";
import LoadingIcon from "../LoadingIcon";
import { signinUser } from "../../api";


export default function LoginForm({ navigation }: { navigation: NavigationProp<RootPublicStackParamList> }) {
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);

    const {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        setLoading
    } = useAuthUser();

    useEffect(() => {
        const loadCredentials = async () => {
            const savedUsername = await AsyncStorage.getItem("savedUsername");
        const savedPassword =await AsyncStorage.getItem("savedPassword");

        if (savedUsername) {
            setUsername(savedUsername);
            setIsChecked(true);
        }
        if (savedPassword) {
            setPassword(savedPassword);
            setIsChecked(true);
        }
        };

        loadCredentials();
    }, [setUsername, setPassword]);

    const loginUser = async() => {
        setHasError(false);
        setErrorMessage("");
        setLoading(true);
        try {
            await signinUser({ username, password });
            // navigate("/");
            if (isChecked) {
                AsyncStorage.setItem("savedUsername", username);
                AsyncStorage.setItem("savedPassword", password);
            } else {
                AsyncStorage.removeItem("savedUsername");
                AsyncStorage.removeItem("savedPassword");
            }
        } catch (error) {
            setHasError(true);
            setErrorMessage("Falha no login. Verifique suas credenciais e tente novamente.");
            console.error("Falha no login", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            AsyncStorage.setItem("savedUsername", username);
            AsyncStorage.setItem("savedPassword", password);
        } else {
            AsyncStorage.removeItem("savedUsername");
            AsyncStorage.removeItem("savedPassword");
        }
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
                {hasError &&
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorSpan}>{errorMessage}</Text>
                    </View>
                }
                <Button
                    content={loading ? <LoadingIcon /> : "Entrar"}
                    onPress ={() => {loginUser()}}
                    backgroundColor={"#1A374B"}
                />
                <Button
                    content={"Cadastrar"}
                    onPress={() => {navigation.navigate("RegisterScreen") }}
                    backgroundColor={"#4EB888"}
                />
            </View>
        </View>
    );
};