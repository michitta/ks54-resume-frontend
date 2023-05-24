"use client";

import { useAuth } from '@/components/auth.context';
import { authService } from '@/services/auth.service';
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
            <div>
                <p>Панель управления резюме</p>
                <h1>Введите данные от своего аккаунта</h1>
            </div>
            <p>Чтобы продолжить работу, Вам необходимо авторизоваться в системе.</p>
            <div>
                <input
                    className={clsx(
                        styles.input,
                        errors.username ? styles.error : null
                    )}
                    type="text"
                    defaultValue={""}
                    placeholder="Введите логин"
                    {...register(`username`, { required: true, maxLength: 100 })}
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
            <button type="submit">Войти в аккаунт</button>
        </form>
    )
}
