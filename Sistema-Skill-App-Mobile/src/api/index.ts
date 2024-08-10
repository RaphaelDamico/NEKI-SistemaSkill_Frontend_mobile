import axios from "axios";
import { Alert } from "react-native";
import { IUserCredentials } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: " https://3f8f-138-117-222-49.ngrok-free.app/"
});

const handleRegisterError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            Alert.alert("Este nome de usuário já existe");
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return;
        } else if (error.request) {
            Alert.alert("Nenhuma resposta recebida do servidor.");
            console.log(error.request);
        } else {
            Alert.alert(`Erro ao configurar a requisição: ${error.message}`);
            console.log('Error', error.message);
        }
    } else {
        Alert.alert(`Erro desconhecido: ${error}`);
        console.log('Error', error);
    }
};

const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
            throw new Error("Usuário ou senha inválidos");
        }
        console.error("Erro de Login", error.message);
        throw new Error("Login falhou");
    } else {
        console.error("Erro desconhecido", error);
        throw new Error("Erro desconhecido");
    }
};

export const signupUser = async (payload: IUserCredentials): Promise<void> => {
    const {
        username,
        password
    } = payload
    try {
        const response = await api.post(`auth/signup`, {
            "username": username,
            "password": password
        });
        if (response.status === 201)
            Alert.alert("Usuário registrado com sucesso");
        else {
            Alert.alert("Erro ao registrar usuário, tente novamente.")
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) 
            throw new Error("Este nome de usuário já existe");
        else {
            handleRegisterError(error);
            throw new Error("Erro desconhecido ao registrar usuário");
        }
    }
};

export const signinUser = async (payload: IUserCredentials): Promise<void> => {
    const {
        username,
        password
    } = payload
    try {
        const response = await api.post(`auth/signin`, {
            "username": username,
            "password": password
        });
        const token = response.data.token;
        const userId = response.data.userId;
        if (!token)
            throw new Error("Token não encontrado na resposta");
        if (!userId)
            throw new Error("User ID não encontrado na resposta");
        await AsyncStorage.setItem("userToken", JSON.stringify(token));
        await AsyncStorage.setItem("userId", JSON.stringify(userId));
        Alert.alert("Login realizado com sucesso");
    } catch (error: unknown) {
        handleAuthError(error);
    }
};