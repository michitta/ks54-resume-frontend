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
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

interface IUser {
    uuid: number;
    username: string;
}

enum driverLicences {
    A,
    B,
    BE,
    C,
    CE,
    D,
    DE,
    M,
    TM,
    TB,
}

enum educationForms {
    fullTime,
    partTime,
    selfStudy,
}

interface IStudent {
    uuid: string;
    fullName: string;
    profession: string;
    birthday: string;
    group: string;
    phone: string;
    email: string;
    telegram?: string;
    driverLicence: driverLicences;
    educationForm: educationForms;
    city: string;
    endYear: number;
    professionalSkills: string[];
    socialSkills: string[];
    additionalSkills: string[];
    additionalInfo: string;
    workExperience?: string;
    educations: string[];
    courses: string[];
    awards: string[];
}

type UniversalContextData = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    student: IStudent | null;
    setStudent: (student: IStudent | null) => void;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    reg: (fullName: string, email: string, password: string) => Promise<void>;
    reFetch: () => Promise<void>;
};

export const UniversalContext = createContext({} as UniversalContextData);

export const useUniversalContext = () => useContext(UniversalContext);

const UniversalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [student, setStudent] = useState<IStudent | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const path = usePathname();

    // useEffect(() => {
    //     if (!user && !isLoading) reFetch();
    // }, []);

    // useEffect(() => {
    //     if (user && !isLoading && path.includes("/auth"))
    //         if (user && !isLoading) router.push("/");
    //     if (!user && !isLoading) router.push("auth/login");
    // }, [user, isLoading]);

    const login = async (email: string, password: string) => {
        const req = await authService.login(email, password);
        if (req) {
            await reFetch();
            toast.success("Вы успешно авторизовались");
        } else {
        }
    };

    const reg = async (fullName: string, email: string, password: string) => {
        const req = await authService.register(fullName, email, password);
        if (req) {
            await reFetch();
            toast.success("Вы успешно зарегистрировались");
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
        <UniversalContext.Provider
            value={{
                user,
                setUser,
                student,
                setStudent,
                login,
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
