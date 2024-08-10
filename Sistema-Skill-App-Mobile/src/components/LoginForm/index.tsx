import { View, Text } from "react-native";
import { styles } from "./styles";
import Input from "../Input";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useEffect, useState } from "react";
import CustomCheckbox from "../Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Button";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function LoginForm() {
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
                    content={loading ? <AntDesign name="loading1" size={24} color="#F9F9F9" /> : "Entrar"}
                    onPress ={() => {}}
                    backgroundColor={"#1A374B"}
                />
                <Button
                    content={"Cadastrar"}
                    onPress={() => {}}
                    backgroundColor={"#4EB888"}
                />
            </View>
        </View>
    );
};