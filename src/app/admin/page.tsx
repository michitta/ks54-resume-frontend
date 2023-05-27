"use client";

import { IStudent, useUniversalContext } from '@/components/universal.context';
import { AsyncSelector } from '@/components/selector';
import styles from '@/styles/admin.module.scss';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
export default function Admin() {
    const router = useRouter();

    const { user, student, setStudent, isLoading } = useUniversalContext();

    return (
        !isLoading && user?.admin &&
        <main className={styles.main}>
            <header>
                <button onClick={() => router.push("/")}>На главную</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" strokeLinecap="round" />
                </svg>
                <span>
                    <p>Панель редактора резюме</p>
                    <p>Добро пожаловать, {user?.fullName}!</p>
                </span>
            </header>
            <div>
                <h1>Выберите параметры</h1>
                <p>Введите данные в формы чтобы перейти к редактированию определённого резюме.</p>
                <div>
                    <div className={styles.top}>
                        <AsyncSelector
                            cacheOptions={true}
                            placeholder={"Введите фамилию студента"}
                            loadOptions={async (inputValue: string) => {
                                const data: IStudent[] = await adminService.searchStudent(inputValue);
                                return data.map((st) => ({
                                    value: st.uuid,
                                    label: st.fullName,
                                }));
                            }}
                            onChange={async (value) => {
                                if (value) {
                                    const data: IStudent = await adminService.getStudent(value?.value)
                                    setStudent(data);
                                }
                            }}
                        />
                    </div>
                    <button type="submit" className={styles.button} onClick={() => {
                        if (student) {
                            router.push(`/admin/edit`);
                        }
                    }}>Найти резюме</button>
                </div>
            </div>
        </main>
    )
}
