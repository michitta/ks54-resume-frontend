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

interface IUser {
    uuid: string;
    fullName: string;
    admin: boolean;
}

export interface IStudent {
    uuid: string;
    fullName: string;
    profession: string;
    birthday: string;
    group: string;
    phone: string;
    email: string;
    telegram?: string;
    driverLicence?: string;
    educationForm: string;
    city: string;
    endYear: string;
    launguages: string;
    professionalSkills: string;
    socialSkills: string;
    additionalSkills: string;
    additionalInfo: string;
    workExperience: string;
    educations: string;
    courses: string;
    awards: string;
    practiceName?: string;
    practiceTime?: string;
    practiceByProfession?: string;
    practiceFunctions?: string;
    workName?: string;
    workTime?: string;
    workByProfession?: string;
    workFunctions?: string;
    lastModified: Date;
    imageHash?: string;
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
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!user) reFetch();
    }, []);

    useEffect(() => {
        if (path != "/" && !path.includes('user/')) {
            if (user) {
                if (user.admin) {
                    !path.includes('admin') && router.push('/admin')
                } else {
                    router.push('/cabinet')
                }
            } else {
                !path.includes('auth') && router.push('/auth/login')
            }
        }
    }, [user, isLoading, path]);

    const login = async (email: string, password: string) => {
        await authService.login(email, password);
        await reFetch();
    };

    const reg = async (fullName: string, email: string, password: string) => {
        await authService.register(fullName, email, password);
        await reFetch();
    };

    const logout = async () => {
        await authService.logout();
        await reFetch();
    }

    const recovery = async (email: string, password: string) => {
        setIsLoading(true);
        const req = await authService.recoveryPass(email, password);
        if (req) router.push('/auth/login');
        setIsLoading(false);
    }

    const reFetch = async () => {
        setIsLoading(true);
        const res = await authService.me();
        if (!res) {
            setIsLoading(false);
            setUser(null);
            setStudent(null);
            return;
        } else {
            setUser(res.data);
            setIsLoading(false);
        }

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
