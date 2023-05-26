"use client";

import { useUniversalContext } from '@/components/universal.context';
import { adminService } from '@/services/admin.service';
import styles from '@/styles/adminEdit.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
export default function Cabinet() {
    const navigator = useRouter();

    const { user, student, logout } = useUniversalContext();

    const { register, handleSubmit, formState: { errors }, control } = useForm({ mode: 'onChange' });
    const onSubmit = async (data: any) => {

    };

    const getWidth = (px: number) => {
        let width = 10 * px;
        if (width === 0) width = 10;
        return `${width}px`;
    };

    const getWidthBig = (px: number) => {
        let width = 10 * px;
        if (width === 0) width = 10;
        return `${width}px`;
    };

    return (
        user &&
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <header>
                <button type="button" onClick={() => navigator.back()}>Назад</button>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => logout()}>Выйти из аккаунта</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" strokeLinecap="round" />
                </svg>
                <p>{student ? "Редактирование резюме студента" : "Создание резюме"} - {user?.fullName}</p>
            </header>
            <main>
                <section>
                    <div>
                        <div>
                            <span>
                                <p>{student ? student.fullName : user?.fullName}</p>
                                <p>Профессия: <input
                                    type="text"
                                    defaultValue={student ? student.profession : ""}
                                    className={errors.profession ? clsx(styles.input, styles.error) : styles.input}
                                    placeholder={student ? student.profession : ""}
                                    style={{ width: getWidth(student ? student.profession.toString().length : 1) }}
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
                                defaultValue={student ? student.birthday : ""}
                                className={errors.birthday ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.birthday : ""}
                                style={{ width: getWidth(student ? student.birthday.toString().length : 1) }}
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
                                defaultValue={student ? student.phone : ""}
                                className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.phone : ""}
                                style={{ width: getWidth(student ? student.phone.toString().length : 1) }}
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
                                defaultValue={student ? student.group : ""}
                                className={errors.gpoup ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.group : ""}
                                style={{ width: getWidth(student ? student.group.length : 1) }}
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
                                defaultValue={student ? student.email : ""}
                                className={errors.email ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.email : ""}
                                maxLength={30}
                                style={{ width: getWidth(student ? student.email.toString().length : 1) }}
                                {...register(`email`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Telegram: <input
                                type="text"
                                defaultValue={student ? student.telegram : ""}
                                className={errors.telegram ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.telegram : ""}
                                maxLength={20}
                                style={{ width: getWidth(student ? student.telegram!.toString().length : 1) }}
                                {...register(`telegram`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Вод. Удостоверение: <input
                                type="text"
                                defaultValue={student ? student.driverLicence : ""}
                                className={errors.driverLicence ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.driverLicence : ""}
                                maxLength={3}
                                style={{ width: getWidth(student ? student.driverLicence.length : 1) }}
                                {...register(`driverLicence`, {
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
                            <p>Форма обучения: <input
                                type="text"
                                defaultValue={student ? student.educationForm : ""}
                                className={errors.educationForm ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.educationForm : ""}
                                maxLength={16}
                                style={{ width: getWidth(student ? student.city.toString().length : 1) }}
                                {...register(`educationForm`, {
                                    required: true,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Город проживания: <input
                                type="text"
                                defaultValue={student ? student.city : ""}
                                className={errors.city ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.city : ""}
                                maxLength={20}
                                style={{ width: getWidth(student ? student.city.toString().length : 1) }}
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
                                defaultValue={student ? student.endYear : ""}
                                className={errors.endYear ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.endYear : ""}
                                maxLength={4}
                                style={{ width: getWidth(student ? student.endYear.toString().length : 1) }}
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
                        <div>
                            <p>Место практики: <input
                                type="text"
                                defaultValue={student ? student.city : ""}
                                className={errors.city ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.city : ""}
                                maxLength={24}
                                style={{ width: getWidth(student ? student.city.toString().length : 1) }}
                                {...register(`city`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Практикуется: <input
                                type="text"
                                defaultValue={student ? student.city : ""}
                                className={errors.profession ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.city : ""}
                                maxLength={24}
                                style={{ width: getWidth(student ? student.city.toString().length : 1) }}
                                {...register(`city`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Выполняет функции: <input
                                type="text"
                                defaultValue={student ? student.endYear : ""}
                                className={errors.profession ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.endYear : ""}
                                maxLength={4}
                                style={{ width: getWidth(student ? student.endYear.toString().length : 1) }}
                                {...register(`endYear`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                            <p>Проходит практику по специальности: <input
                                type="text"
                                defaultValue={student ? student.endYear : ""}
                                className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.endYear : ""}
                                maxLength={4}
                                style={{ width: getWidth(student ? student.endYear.toString().length : 1) }}
                                {...register(`endYear`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                        </div>
                        <div>
                            <p>Сейчас работает: <input
                                type="text"
                                defaultValue={student ? student.city : ""}
                                className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.city : ""}
                                maxLength={24}
                                style={{ width: getWidth(student ? student.city.toString().length : 1) }}
                                {...register(`city`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Работает: <input
                                type="text"
                                defaultValue={student ? student.city : ""}
                                className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.city : ""}
                                maxLength={24}
                                style={{ width: getWidth(student ? student.city.toString().length : 1) }}
                                {...register(`city`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Выполняет функции: <input
                                type="text"
                                defaultValue={student ? student.endYear : ""}
                                className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.endYear : ""}
                                maxLength={4}
                                style={{ width: getWidth(student ? student.endYear.toString().length : 1) }}
                                {...register(`endYear`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                            <p>Работает по специальности: <input
                                type="text"
                                defaultValue={student ? student.endYear : ""}
                                className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.endYear : ""}
                                maxLength={4}
                                style={{ width: getWidth(student ? student.endYear.toString().length : 1) }}
                                {...register(`endYear`, {
                                    required: false,
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                        </div>
                        <div>
                            <p>Иностр. языки: <input
                                type="text"
                                defaultValue={student ? student.endYear : ""}
                                className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.endYear : ""}
                                maxLength={4}
                                style={{ width: getWidth(student ? student.endYear.toString().length : 1) }}
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
                </section>
                <section>
                    <div>
                        <p>Проф. Навыки: <input
                            type="text"
                            defaultValue={student ? student.professionalSkills : ""}
                            className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                            placeholder={student ? student.professionalSkills : ""}
                            maxLength={20}
                            style={{ width: getWidth(student ? student.professionalSkills.length : 1) }}
                            {...register(`professionalSkills`, {
                                required: true,
                                onChange: (e) => {
                                    const value = e.target.value;
                                    const width = getWidth(value.toString().length);
                                    e.target.style.width = width;
                                },

                            })}
                        /></p>
                        <p>Соц. навыки: <input
                            type="text"
                            defaultValue={student ? student.socialSkills : ""}
                            className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                            placeholder={student ? student.socialSkills : ""}
                            maxLength={4}
                            style={{ width: getWidth(student ? student.socialSkills.length : 1) }}
                            {...register(`socialSkills`, {
                                required: true,
                                onChange: (e) => {
                                    const value = e.target.value;
                                    const width = getWidth(value.toString().length);
                                    e.target.style.width = width;
                                },

                            })}
                        /></p>
                        <p>Образование: <input
                            type="text"
                            defaultValue={student ? student.educations : ""}
                            className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                            placeholder={student ? student.educations : ""}
                            maxLength={4}
                            style={{ width: getWidth(student ? student.educations.length : 1) }}
                            {...register(`educations`, {
                                required: true,
                                onChange: (e) => {
                                    const value = e.target.value;
                                    const width = getWidth(value.toString().length);
                                    e.target.style.width = width;
                                },

                            })}
                        /></p>
                        <p>Пройденные курсы: <input
                            type="text"
                            defaultValue={student ? student.courses : ""}
                            className={errors.phone ? clsx(styles.input, styles.error) : styles.input}
                            placeholder={student ? student.courses : ""}
                            maxLength={4}
                            style={{ width: getWidth(student ? student.courses.length : 1) }}
                            {...register(`courses`, {
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
                        <span>
                            <p>Доп. навыки: </p>
                            <input
                                type="text"
                                defaultValue={student ? student.additionalSkills : ""}
                                className={errors.additionalSkills ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.additionalSkills : ""}
                                maxLength={100}
                                {...register(`additionalSkills`, { required: true })}
                            />
                        </span>
                        <span>
                            <p>Доп. Информация: </p>
                            <textarea
                                defaultValue={student ? student.additionalInfo : ""}
                                className={errors.additionalInfo ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.additionalInfo : ""}
                                maxLength={200}
                                {...register(`additionalInfo`, { required: true })}
                            />
                        </span>
                        <span>
                            <p>Опыт работы: </p>
                            <textarea
                                defaultValue={student ? student.workExperience : ""}
                                className={errors.workExperience ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.workExperience : ""}
                                maxLength={400}
                                draggable={false}
                                {...register(`workExperience`, { required: true })}
                            />
                        </span>
                    </div>
                </section>
            </main >
        </form >
    )
}
