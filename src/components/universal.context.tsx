"use client";

import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { authService } from "@/services/auth.service";
import { useRouter, usePathname } from "next/navigation";
import { error, success } from "@/utils/toaster";

interface IUser {
    uuid: number;
    fullName: string;
    admin: boolean;
}

interface IStudent {
    uuid: string;
    fullName: string;
    profession: string;
    birthday: string;
    group: string;
    phone: string;
    email: string;
    telegram: string;
    driverLicence: string;
    educationForm: string;
    city: string;
    endYear: string;
    professionalSkills: string;
    socialSkills: string;
    additionalSkills: string;
    additionalInfo: string;
    workExperience: string;
    educations: string;
    courses: string;
    awards: string;
}

type UniversalContextData = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    student: IStudent | null;
    setStudent: (student: IStudent | null) => void;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    reg: (fullName: string, email: string, password: string) => Promise<void>;
    reFetch: () => Promise<void>;
    recovery: (email: string, password: string) => Promise<void>
};

export const UniversalContext = createContext({} as UniversalContextData);

export const useUniversalContext = () => useContext(UniversalContext);

const UniversalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [student, setStudent] = useState<IStudent | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigator = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!user) reFetch();
    }, []);

    useEffect(() => {
        if (!user && !isLoading) if (!path.includes('auth') && path != "/") navigator.push('/auth/login')
        if (user && !isLoading && path.includes('auth')) {
            console.log(user.admin)
            if (user.admin) {
                navigator.push('/admin')
            } else {
                navigator.push('/cabinet')
            }
        };
    }, [user, isLoading, path]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const req = await authService.login(email, password);
        if (req) await reFetch();
        setIsLoading(false);
    };

    const reg = async (fullName: string, email: string, password: string) => {
        setIsLoading(true);
        const req = await authService.register(fullName, email, password);
        if (req) await reFetch();
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        const req = await authService.logout();
        if (req) await reFetch();
        setIsLoading(false);
    }

    const recovery = async (email: string, password: string) => {
        setIsLoading(true);
        const req = await authService.recoveryPass(email, password);
        if (req) navigator.push('/auth/login');
        setIsLoading(false);
    }

    const reFetch = async () => {
        setIsLoading(true);
        const res = await authService.me();
        setIsLoading(false);
        if (!res) return;
        setUser(res.data);
    };

    return (
        <UniversalContext.Provider
            value={{
                user,
                setUser,
                student,
                setStudent,
                login,
                logout,
                recovery,
                reg,
                reFetch,
                isLoading,
            }}
        >
            {children}
        </UniversalContext.Provider>
    );
};

export default UniversalProvider;
