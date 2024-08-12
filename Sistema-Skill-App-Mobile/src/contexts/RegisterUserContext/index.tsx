import { ReactNode, createContext, useContext, useState } from "react";
import { RegisterUserContextProps } from "../../interfaces";

const RegisterUserContext = createContext<RegisterUserContextProps | undefined>(undefined);

export const RegisterUserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    return (
        <RegisterUserContext.Provider value={{
            username,
            setUsername,
            password,
            setPassword,
            confirmPassword,
            setConfirmPassword,
            loading,
            setLoading
        }}>
            {children}
        </RegisterUserContext.Provider>
    );
};

export const useRegisterUser = (): RegisterUserContextProps => {
    const context = useContext(RegisterUserContext);
    if (!context)
        throw new Error("useRegisterUser deve ser usado com um RegisterUserProvider");
    return context;
};