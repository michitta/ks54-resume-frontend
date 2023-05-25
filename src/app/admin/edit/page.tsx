"use client";

import { Selector } from '@/components/selector';
import { useUniversalContext } from '@/components/universal.context';
import { adminService } from '@/services/admin.service';
import styles from '@/styles/adminEdit.module.scss';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
export default function Admin() {
    const navigator = useRouter();

    const { user, student } = useUniversalContext();

    const { register, handleSubmit, formState: { errors }, control } = useForm({ mode: 'onChange' });
    const onSubmit = async (data: any) => {
        await adminService.setStudent(student!.uuid, data);
    };

    const getWidth = (px: number) => {
        let width = 11 * px;
        if (width === 0) width = 10;
        return `${width}px`;
    };

    return (
        student &&
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <header>
                <button type="button" onClick={() => navigator.back()}>Назад</button>
                <button type="submit">Сохранить</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" strokeLinecap="round" />
                </svg>
                <p>Редактирование резюме студента - {student.fullName}</p>
            </header>
            <main>
                <section>
                    <div>
                        <div>
                            <span>
                                <p>{student.fullName}</p>
                                <p>Профессия: <input
                                    type="text"
                                    defaultValue={student.profession}
                                    className={styles.input}
                                    placeholder={student.profession}
                                    style={{ width: getWidth(student.profession.toString().length) }}
                                    {...register(`profession`, {
                                        required: true,
                                        onChange: (e) => {
                                            const value = e.target.value;
                                            const width = getWidth(value.toString().length);
                                            e.target.style.width = width;
                                        },
                                    })}
                                /></p>
                            </span>
                        </div>
                        <div>
                            <p>Год рождения: <input
                                type="text"
                                defaultValue={student.birthday}
                                className={styles.input}
                                placeholder={student.birthday}
                                style={{ width: getWidth(student.birthday.toString().length) }}
                                maxLength={10}
                                {...register(`birthday`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Номер телефона: <input
                                type="text"
                                defaultValue={student.phone}
                                className={styles.input}
                                placeholder={student.phone}
                                style={{ width: getWidth(student.phone.toString().length) }}
                                maxLength={12}
                                {...register(`phone`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Группа: <input
                                type="text"
                                defaultValue={student.group}
                                className={styles.input}
                                placeholder={student.group}
                                style={{ width: getWidth(student.group.toString().length) }}
                                maxLength={12}
                                {...register(`group`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                        </div>
                        <div>
                            <p>Email: <input
                                type="text"
                                defaultValue={student.email}
                                className={styles.input}
                                placeholder={student.email}
                                maxLength={24}
                                style={{ width: getWidth(student.email.toString().length) }}
                                {...register(`email`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            {student.telegram && <p>Telegram: <input
                                type="text"
                                defaultValue={student.telegram}
                                className={styles.input}
                                placeholder={student.telegram}
                                maxLength={20}
                                style={{ width: getWidth(student.telegram.toString().length) }}
                                {...register(`telegram`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>}
                            <p>Вод. Удостоверение: Категория </p>
                        </div>
                        <div>
                            <p>Форма обучения: </p>
                            <p>Город проживания: <input
                                type="text"
                                defaultValue={student.city}
                                className={styles.input}
                                placeholder={student.city}
                                maxLength={24}
                                style={{ width: getWidth(student.city.toString().length) }}
                                {...register(`city`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Год завершения обучения: <input
                                type="text"
                                defaultValue={student.endYear}
                                className={styles.input}
                                placeholder={student.endYear}
                                maxLength={4}
                                style={{ width: getWidth(student.endYear.toString().length) }}
                                {...register(`endYear`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                        </div>
                    </div>
                    <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H1379" stroke="#333333" strokeLinecap="round" />
                    </svg>
                    <div>

                    </div>
                </section>
                <section>

                </section>
            </main>
        </form >
    )
}
