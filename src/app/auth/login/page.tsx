"use client";

import { useAuth } from '@/components/auth.context';
import styles from '@/styles/auth.module.scss';
import clsx from 'clsx';
import { Head } from 'next/document';
import { useForm } from 'react-hook-form';
export default function LogIn() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const { login, isLoading } = useAuth();
    const onSubmit = (data: any) => {
        (data?.username && data?.password) && login(data);
    };

    return (
        !isLoading &&
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Head>
                <title>Авторизация</title>
            </Head>
            <header>
                <button>Назад</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" stroke-linecap="round" />
                </svg>
                <p>Вход в аккаунт</p>
            </header>
            <div>
                <h1>С возвращением</h1>
                <p>Чтобы продолжить работу, Вам необходимо авторизоваться в системе.</p>
                <div>
                    <div>
                        <input
                            className={clsx(
                                styles.input,
                                errors.email ? styles.error : null
                            )}
                            type="text"
                            defaultValue={""}
                            placeholder="Введите почту"
                            {...register(`email`, { required: true, maxLength: 100 })}
                        />
                        <input
                            className={clsx(
                                styles.input,
                                errors.password ? styles.error : null
                            )}
                            type="password"
                            defaultValue={""}
                            placeholder="Введите пароль"
                            {...register(`password`, { required: true, maxLength: 100 })}
                        />
                    </div>
                    <div>
                        <button type="submit">Войти в аккаунт</button>
                        <span>
                            <a>У Вас нет аккаунта?</a>
                            <a>Забыли пароль?</a>
                        </span>
                    </div>
                </div>

            </div>
        </form>
    )
}
