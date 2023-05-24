"use client";

import { useAuth } from '@/components/auth.context';
import { AsyncSelector, Selector } from '@/components/selector';
import { usersService } from '@/services/users.service';
import styles from '@/styles/admin.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function Admin() {
    const navigator = useRouter();
    const [isLoad, setIsLoad] = useState(false);

    const { user, isLoading } = useAuth();

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
                            placeholder={"Выберите группу"}
                            defaultOptions={true}
                            loadOptions={async () => {
                                const data = await usersService.getGroups();
                                return data.map((group: string, index: number) => ({
                                    value: index,
                                    label: group,
                                }));
                            }}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Найти резюме</button>
                </div>

            </div>
        </main>
    )
}
