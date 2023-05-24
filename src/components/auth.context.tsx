"use client";

import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { authService } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

interface IUser {
    uuid: number;
    username: string;
}

type AuthContextData = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    login: (data: UserData) => Promise<void>;
    isLoading: boolean;
    reFetch: () => Promise<void>;
};

export type UserData = {
    username: string;
    password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    // const path = usePathname();

    // useEffect(() => {
    //     if (!user && !isLoading) reFetch();
    // }, []);

    // useEffect(() => {
    //     if (user && !isLoading) router.push("/");
    //     if (!user && !isLoading) router.push("auth/login");
    // }, [user, isLoading]);

    const login = async (data: UserData) => {
        const req = await authService.login(data.username, data.password);
        if (req) {
            await reFetch();
            toast.success("Вы успешно авторизовались");
        } else {
        }
    };

    const reFetch = async () => {
        setIsLoading(true);
        const res = await authService.me();
        setIsLoading(false);
        if (!res) return;
        setUser(res);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                reFetch,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
