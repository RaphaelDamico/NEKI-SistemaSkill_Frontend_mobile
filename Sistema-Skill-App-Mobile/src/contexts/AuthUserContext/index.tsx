import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { signinUser } from "../../api";


interface AuthUserContextProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    loginUser: () => Promise<void>;
    signOut: () => Promise<void>;
    signed: boolean;
}

const AuthUserContext = createContext<AuthUserContextProps | undefined>(undefined);

export const AuthUserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<object | null>(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadStorageData = async () => {
            const storedToken = await AsyncStorage.getItem("userToken");
            const storedUserId = await AsyncStorage.getItem("userId");
            if (storedToken) {
                setUser({ token: storedToken, userId: storedUserId });
            }
        };
        loadStorageData();
    }, []);

    const loginUser = async () => {
        setLoading(true);
        try {
            await signinUser({ username, password });
            const storedToken = await AsyncStorage.getItem("userToken");
            const storedUserId = await AsyncStorage.getItem("userId");
            if (storedToken && storedUserId) {
                setUser({ token: storedToken, userId: storedUserId });
            } else {
                throw new Error("Token não recebido");
            }
        } catch (error) {
            console.error("Falha no login", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userId");
        setUser(null);
    };

    return(
        <AuthUserContext.Provider value={{
            signed: !!user,
            username,
            setUsername,
            password,
            setPassword,
            loading,
            setLoading,
            loginUser,
            signOut
        }}>
            { children }
        </AuthUserContext.Provider>
    );
};

export const useAuthUser =(): AuthUserContextProps => {
    const context = useContext(AuthUserContext);
    if(!context)
        throw new Error("useAuthUser deve ser usado com um AuthUserProvider");
    return context;
};