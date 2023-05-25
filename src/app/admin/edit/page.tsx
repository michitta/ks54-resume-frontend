"use client";

import { useUniversalContext } from '@/components/universal.context';
import { AsyncSelector, Selector } from '@/components/selector';
import { usersService } from '@/services/users.service';
import styles from '@/styles/adminEdit.module.scss';
import { loadStudents } from '@/types/admin.types';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
export default function Admin() {
    const navigator = useRouter();

    const { user, student, setStudent, isLoading } = useUniversalContext();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {

    };

    return (
        student &&
        <main className={styles.main}>
            <header>
                <button onClick={() => navigator.back()}>Назад</button>
                <button onClick={() => navigator.push("/")}>Сохранить</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" stroke-linecap="round" />
                </svg>
                <p>Редактирование резюме студента - {student.fullName}</p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <section>
                    <div>
                        <div>
                            <span>
                                <p>{student.fullName}</p>
                                <p>Профессия: <input
                                    type="text"
                                    defaultValue={student.profession}
                                    placeholder="Введите почту"
                                    {...register(`email`, { required: true, maxLength: 12 })}
                                /></p>
                            </span>
                        </div>
                        <div>
                            <p>Год рождения: {student.birthday}</p>
                            <p>Номер телефона: {student.phone}</p>
                            <p>Группа: {student.group}</p>
                        </div>
                        <div>
                            <p>Email: {student.email}</p>
                            <p>Telegram: {student.telegram}</p>
                            <p>Вод. Удостоверение: Категория {student.driverLicence}</p>
                        </div>
                        <div>
                            <p>Форма обучения: {student.educationForm}</p>
                            <p>Город проживания: {student.city}</p>
                            <p>Год завершения обучения: {student.endYear}</p>
                        </div>
                    </div>
                    <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H1379" stroke="#333333" stroke-linecap="round" />
                    </svg>
                    <div>

                    </div>
                </section>
                <section>

                </section>
            </form>
        </main>
    )
}
