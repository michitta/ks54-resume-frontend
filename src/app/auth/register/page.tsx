"use client";

import { useUniversalContext } from '@/components/universal.context';
import styles from '@/styles/auth.module.scss';
import clsx from 'clsx';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const metadata: Metadata = {
    title: "Регистрация аккаунт"
};

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const { user, isLoading, reg } = useUniversalContext();
    const onSubmit = (data: any) => {
        if (data) {
            reg(data.fullName, data.email, data.password);
        }
    };

    return (
        !isLoading && !user &&
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <header>
                <button type='button' onClick={() => router.back()}>Назад</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" strokeLinecap="round" />
                </svg>
                <p>Создание аккаунта</p>
            </header>
            <div>
                <h1>Остался последний шаг</h1>
                <p>Чтобы продолжить работу, Вам необходимо зарегистрировать аккаунт.</p>
                <div>
                    <div className={styles.top}>
                        <input
                            className={clsx(
                                styles.input,
                                errors.fullName ? styles.error : null
                            )}
                            type="text"
                            defaultValue={""}
                            placeholder="Введите ФИО (Абоб А.Р.)"
                            {...register(`fullName`, { required: true, maxLength: 100, pattern: /^[А-ЯЁ][а-яё]+\s[А-ЯЁ]\.([А-ЯЁ]\.)?$/ })}
                        />
                        <input
                            className={clsx(
                                styles.input,
                                errors.email ? styles.error : null
                            )}
                            type="text"
                            defaultValue={""}
                            placeholder="Введите почту"
                            {...register(`email`, { required: true, maxLength: 100, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                        />
                        <input
                            className={clsx(
                                styles.input,
                                errors.password ? styles.error : null
                            )}
                            type="password"
                            defaultValue={""}
                            placeholder="Придумайте пароль"
                            {...register(`password`, { required: true, maxLength: 40, minLength: 6 })}
                        />
                    </div>
                    <div className={styles.bottom}>
                        <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? (
                            <span></span>
                        ) : "Создать аккаунт"}</button>
                        <span>
                            <a onClick={() => router.push('auth/login')}>У Вас уже есть аккаунт?</a>
                        </span>
                    </div>
                </div>

            </div>
        </form>
    )
}
