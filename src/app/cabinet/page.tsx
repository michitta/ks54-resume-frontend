"use client";

import { useUniversalContext } from '@/components/universal.context';
import { AsyncSelector, Selector } from '@/components/selector';
import { usersService } from '@/services/users.service';
import styles from '@/styles/admin.module.scss';
import { loadStudents } from '@/types/admin.types';
import { useRouter } from 'next/navigation';
export default function Admin() {
    const navigator = useRouter();

    const { user, student, setStudent, isLoading } = useUniversalContext();

    return (
        // !isLoading && user &&
        <main className={styles.main}>
            <header>
                <button onClick={() => navigator.push("/")}>На главную</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" stroke-linecap="round" />
                </svg>
                <span>
                    <p>Панель редактора резюме</p>
                    <p>Добро пожаловать, {user?.username}!</p>
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
                            defaultOptions={true}
                            loadOptions={async (inputValue: string) => {
                                const data: loadStudents[] = await usersService.getBySurName(inputValue);
                                return data.map((st) => ({
                                    value: st.uuid,
                                    label: st.fullName,
                                }));
                            }}
                            onChange={async (value) => {
                                if (value) {
                                    const data: loadStudents = await usersService.getById(value?.value)
                                    setStudent(data);
                                }
                            }}
                        />
                    </div>
                    <button type="submit" className={styles.button} onClick={() => {
                        student && navigator.push(`/admin/edit`);
                    }}>Найти резюме</button>
                </div>
            </div>
        </main>
    )
}
