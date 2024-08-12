import axios from "axios";
import { Alert } from "react-native";
import { IUserCredentials, Skill, UpdateUserSkill, UpdateUserSkillLevelResponse, UserSkillRequest, UserSkillResponse } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "https://1ac0-138-117-222-49.ngrok-free.app/"
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
        const response = await api.post(`users/signup`, {
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
        if (axios.isAxiosError(error) && error.response?.status === 404)
            throw new Error("Login ou senha incorretos, verifique suas credenciais");
        else {
            handleAuthError(error);
            throw new Error("Erro desconhecido ao efetuar login");
        }
    }
};

export const addSkillToUser = async (payload: UserSkillRequest[]): Promise<Skill[] | null> => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.post<Skill[]>("skills/add-existing", payload, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar skill ao usuário: ", error);
        return null;
    }
};

export const getAllSkills = async (): Promise<Skill[] | null> => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.get<Skill[]>("skills", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar skills:", error);
        return null;
    }
};

export const getUserSkills = async (userId: number): Promise<UserSkillResponse | null> => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.get<UserSkillResponse>(`users/${userId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar skills do usuário:", error);
        return null;
    }
};

export const updateUserSkillLevel = async ({ userSkillId, level }: UpdateUserSkill): Promise<UpdateUserSkillLevelResponse> => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("Token não encontrado");

        await api.put(`skills/level`,
            { userSkillId, level },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }
        );
        return {
            success: true,
            message: "Nível da habilidade atualizado com sucesso!",
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Erro ao atualizar nível da skill com o id ${userSkillId}:`, error.message);
            return {
                success: false,
                message: `Erro: ${error.response?.data || error.message}`
            };
        } else {
            console.error("Erro desconhecido:", error);
            return {
                success: false,
                message: "Erro desconhecido ao atualizar o nível da habilidade.",
            };
        }
    }
};

export const deleteUserSkill = async (skillId: number): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }

        await api.delete(`skills/${skillId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
    } catch (error) {
        console.error(`Erro ao deletar skill com o id ${skillId}:`, error);
    }
};
