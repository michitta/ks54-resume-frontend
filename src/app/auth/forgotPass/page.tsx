"use client";

import { useUniversalContext } from '@/components/universal.context';
import { authService } from '@/services/auth.service';
import styles from '@/styles/auth.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
export default function ForgotPass() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigator = useRouter();

    const { user, login, isLoading } = useUniversalContext();
    const onSubmit = async (data: any) => {
        if (data) await authService.recoveryPass(data.email, data.password);
    };

    return (
        !isLoading && !user &&
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <header>
                <button onClick={() => navigator.back()}>Назад</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" strokeLinecap="round" />
                </svg>
                <p>Восстановление доступа</p>
            </header>
            <div>
                <h1>Осталось ещё чуть-чуть</h1>
                <p>Чтобы восстановить пароль Вам необходимо ввести почту, к которой привязан аккаунт.</p>
                <div>
                    <div className={styles.top}>
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
                            placeholder="Введите новый пароль"
                            {...register(`password`, { required: true, maxLength: 40, minLength: 10 })}
                        />
                    </div>
                    <div className={styles.bottom}>
                        <button type="submit" className={styles.button}>Восстановить доступ</button>
                        <span>
                            <a onClick={() => navigator.push('auth/login')}>Вспомнили пароль?</a>
                        </span>
                    </div>
                </div>

            </div>
        </form>
    )
}
