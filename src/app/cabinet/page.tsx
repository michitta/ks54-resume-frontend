"use client";

import { useUniversalContext } from '@/components/universal.context';
import { usersService } from '@/services/users.service';
import styles from '@/styles/adminEdit.module.scss';
import { error, success } from '@/utils/toaster';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
export default function Cabinet() {
    const router = useRouter();

    const { user, student, setStudent, logout, isLoading, reFetch } = useUniversalContext();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onChange' });
    const onSubmit = async (data: any) => {
        await usersService.setStudent(data);
        reset();
        await getStudent();
    };

    const getWidth = (px: number) => {
        let width = 10 * px;
        if (width === 0) width = 10;
        return `${width}px`;
    };

    const getStudent = async () => {
        setStudent(null);
        setStudent(await usersService.getStudent(user!.uuid))
    }

    const onChangeSkin = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            let item = event.target.files![0];
            if (!item) return;
            if (item.size > 1000000) {
                error('Размер файла превышает 1мб');
                return;
            }
            let formData = new FormData();
            formData.append("file", item);
            await usersService.changeIcon(formData);
            await reFetch();
        }, []
    );

    useMemo(async () => {
        if (user) await getStudent();
    }, [user])

    return (
        user && !user.admin &&
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
            <header>
                <button type="button" onClick={() => router.push('/')}>Назад</button>
                <button type="submit">Сохранить</button>
                {student && <button type="button" onClick={async () => {
                    await usersService.deleteStudent();
                    reset();
                    await getStudent();
                }}>Удалить</button>}
                <button type="button" onClick={() => logout()}>Выйти</button>
                <button type="button" onClick={() => {
                    navigator.clipboard
                        .writeText('https://owocon.eu.org/user/' + user.uuid)
                        .then(() => success("Ссылка на резюме скопирована в буфер обмена!"));
                }}>Поделиться</button>
                <svg width="2" height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" strokeLinecap="round" />
                </svg>
                <p>{student ? "Редактирование резюме" : "Создание резюме"} - {user?.fullName}</p>
            </header>
            <main>
                <section>
                    <div>
                        <div className='gap-[10px]'>
                            <button type={'button'} onClick={() => document.getElementById("skin")?.click()}>
                                <Image
                                    width={60}
                                    height={60}
                                    alt="User head"
                                    src={user.lastModified ? `https://cdn.vaultcommunity.net/hackaton/${user.uuid}.png?lastModified=${user.lastModified}` : `https://cdn.vaultcommunity.net/hackaton/undefined.png`}
                                    className="rounded-full"
                                    quality={100}
                                    priority
                                ></Image>
                            </button>
                            <input
                                style={{ display: "none" }}
                                id="skin"
                                type="file"
                                accept="image/png"
                                onChange={onChangeSkin}
                            ></input>
                            <span>
                                <input
                                    type="text"
                                    className={errors.fullName ? clsx(styles.input, styles.error) : styles.input}
                                    placeholder={student?.fullName ? student?.fullName : user.fullName}
                                    style={{ width: getWidth(student?.fullName ? student?.fullName.length + 2 : user.fullName.length + 2) }}
                                    disabled={true}
                                    maxLength={20}
                                    {...register(`fullName`, {
                                        required: false,
                                        value: student?.fullName ? student?.fullName : user.fullName,
                                        onChange: (e) => {
                                            let value = e.target.value;
                                            if (value == 0) value = e.target.defaultValue
                                            const width = getWidth(value.toString().length);
                                            e.target.style.width = width;
                                        },
                                    })}
                                />
                                <p>Профессия: <input
                                    type="text"
                                    defaultValue={student ? student.profession : ""}
                                    className={errors.profession ? clsx(styles.input, styles.error) : styles.input}
                                    placeholder={student ? student.profession : ""}
                                    style={{ width: getWidth(student ? student.profession.toString().length : 1) }}
                                    {...register(`profession`, {
                                        required: true,
                                        onChange: (e) => {
                                            let value = e.target.value;
                                            if (value == 0) value = e.target.defaultValue
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
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Группа: <input
                                type="text"
                                defaultValue={student ? student.group : ""}
                                className={errors.group ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.group : ""}
                                style={{ width: getWidth(student ? student.group.length : 1) }}
                                maxLength={12}
                                {...register(`group`, {
                                    required: true,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                style={{ width: getWidth(student?.driverLicence ? student.driverLicence.length : 1) }}
                                {...register(`driverLicence`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                                defaultValue={student ? student.practiceName : ""}
                                className={errors.practiceName ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.practiceName : ""}
                                maxLength={24}
                                style={{ width: getWidth(student?.practiceName ? student.practiceName.length : 1) }}
                                {...register(`practiceName`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Практикуется (время): <input
                                type="text"
                                defaultValue={student ? student.practiceTime : ""}
                                className={errors.practiceTime ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.practiceTime : ""}
                                maxLength={24}
                                style={{ width: getWidth(student?.practiceTime ? student.practiceTime.length : 1) }}
                                {...register(`practiceTime`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Выполняет функции: <input
                                type="text"
                                defaultValue={student ? student.practiceFunctions : ""}
                                className={errors.practiceFunctions ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.practiceFunctions : ""}
                                maxLength={40}
                                style={{ width: getWidth(student?.practiceFunctions ? student.practiceFunctions.length : 1) }}
                                {...register(`practiceFunctions`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                            <p>Проходит практику по специальности: <input
                                type="text"
                                defaultValue={student ? student.practiceByProfession : ""}
                                className={errors.practiceByProfession ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.practiceByProfession : ""}
                                maxLength={40}
                                style={{ width: getWidth(student?.practiceByProfession ? student.practiceByProfession.length : 1) }}
                                {...register(`practiceByProfession`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                        </div>
                        <div>
                            <p>Сейчас работает: <input
                                type="text"
                                defaultValue={student ? student.workName : ""}
                                className={errors.workName ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.workName : ""}
                                maxLength={24}
                                style={{ width: getWidth(student?.workName ? student.workName.length : 1) }}
                                {...register(`workName`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Работает (время): <input
                                type="text"
                                defaultValue={student ? student.workTime : ""}
                                className={errors.workTime ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.workTime : ""}
                                maxLength={24}
                                style={{ width: getWidth(student?.workTime ? student.workTime.length : 1) }}
                                {...register(`workTime`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },
                                })}
                            /></p>
                            <p>Выполняет функции: <input
                                type="text"
                                defaultValue={student ? student.workFunctions : ""}
                                className={errors.workFunctions ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.workFunctions : ""}
                                maxLength={40}
                                style={{ width: getWidth(student?.workFunctions ? student.workFunctions.length : 1) }}
                                {...register(`workFunctions`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value.lenght == 0) value = e.target.defaultValue
                                        const width = getWidth(value.toString().length);
                                        e.target.style.width = width;
                                    },

                                })}
                            /></p>
                            <p>Работает по специальности: <input
                                type="text"
                                defaultValue={student ? student.workByProfession : ""}
                                className={errors.workByProfession ? clsx(styles.input, styles.error) : styles.input}
                                placeholder={student ? student.workByProfession : ""}
                                maxLength={40}
                                style={{ width: getWidth(student?.workByProfession ? student.workByProfession.length : 1) }}
                                {...register(`workByProfession`, {
                                    required: false,
                                    onChange: (e) => {
                                        let value = e.target.value;
                                        if (value == 0) value = e.target.defaultValue
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
                        <span>
                            <p>Иностр. языки: </p>
                            <textarea
                                defaultValue={student ? student.launguages : ""}
                                className={errors.launguages ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.socialSkills : ""}
                                maxLength={100}
                                {...register(`launguages`, { required: true })}
                            />
                        </span>
                        <span>
                            <p>Проф. Навыки: </p>
                            <textarea
                                defaultValue={student ? student.professionalSkills : ""}
                                className={errors.professionalSkills ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.professionalSkills : ""}
                                maxLength={255}
                                {...register(`professionalSkills`, { required: true })}
                            /></span>
                        <span>
                            <p>Соц. навыки: </p>
                            <textarea
                                defaultValue={student ? student.socialSkills : ""}
                                className={errors.socialSkills ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.socialSkills : ""}
                                maxLength={255}
                                {...register(`socialSkills`, { required: true })}
                            />
                        </span>
                        <span>
                            <p>Образование: </p>
                            <textarea
                                defaultValue={student ? student.educations : ""}
                                className={errors.educations ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.educations : ""}
                                maxLength={100}
                                {...register(`educations`, { required: true })}
                            />
                        </span>
                        <span>
                            <p>Пройденные курсы: </p>
                            <textarea
                                defaultValue={student ? student.courses : ""}
                                className={errors.courses ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.courses : ""}
                                maxLength={255}
                                {...register(`courses`, { required: true })}
                            />
                        </span>
                        <span>
                            <p>Доп. навыки: </p>
                            <textarea
                                defaultValue={student ? student.additionalSkills : ""}
                                className={errors.additionalSkills ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.additionalSkills : ""}
                                maxLength={255}
                                {...register(`additionalSkills`, { required: true })}
                            />
                        </span>
                        <span>
                            <p>Доп. Информация: </p>
                            <textarea
                                defaultValue={student ? student.additionalInfo : ""}
                                className={errors.additionalInfo ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.additionalInfo : ""}
                                maxLength={255}
                                {...register(`additionalInfo`, { required: false })}
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
                        <span>
                            <p>Награды: </p>
                            <textarea
                                defaultValue={student ? student.awards : ""}
                                className={errors.awards ? clsx(styles.textarea, styles.error) : styles.textarea}
                                placeholder={student ? student.awards : ""}
                                maxLength={400}
                                draggable={false}
                                {...register(`awards`, { required: true })}
                            />
                        </span>
                    </div>
                </section>
            </main >
        </form >
    )
}
