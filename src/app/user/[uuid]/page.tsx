import { usersService } from '@/services/users.service';
import styles from '@/styles/user.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import undefinedImg from '../../../undefined.png';

const fetchData = async (uuid: string) => {
    return await usersService.getStudent(uuid);
}

export default async function User({ params }: any) {
    const student = await fetchData(params.uuid);
    if (!student) return notFound();

    return (
        <main className={styles.main} >
            <header>
                <Link href={`/`}>На главную</Link>
                <svg height="22" viewBox="0 0 2 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 21" stroke="#333333" strokeLinecap="round" />
                </svg>
                <p>Просмотр резюме - {student.fullName}</p>
            </header>
            <div>
                <section>
                    <div>
                        <div>
                            <Image
                                width={60}
                                height={60}
                                alt="User head"
                                src={`http://172.20.0.2:9000/images/${student?.imageHash}.png` || undefinedImg}
                                className="rounded-full"
                                quality={100}
                                priority
                            />
                            <span className='flex flex-col'>
                                <h1>{student.fullName}</h1>
                                <p>Профессия: {student.profession}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <p>Год рождения: </p>
                                <p>{student.birthday}</p>
                            </span>
                            <span>
                                <p>Номер телефона: </p>
                                <p>{student.phone}</p>
                            </span>
                            <span>
                                <p>Группа: </p>
                                <p>{student.group}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <p>Email: </p>
                                <p>{student.email}</p>
                            </span>
                            <span>
                                <p>Telegram: </p>
                                <p>{student.telegram ? student.telegram : 'не указан'}</p>
                            </span>
                            <span>
                                <p>Вод. Удостоверение: </p>
                                <p>{student.driverLicence ? student.driverLicence : 'не указано'}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <p>Форма обучения: </p>
                                <p>{student.educationForm}</p>
                            </span>
                            <span>
                                <p>Город проживания: </p>
                                <p>{student.city}</p>
                            </span>
                            <span>
                                <p>Год завершения обучения: </p>
                                <p>{student.endYear}</p>
                            </span>
                        </div>
                    </div>
                    <svg style={{
                        width: '100%',
                        height: '1px',
                        border: '1px solid #333333',
                        borderRadius: '10px',
                    }} viewBox="0 0 1052 2" stroke='#333333' xmlns="http://www.w3.org/2000/svg">
                    </svg>
                    <div>
                        <div>
                            <span>
                                <p>Место практики: </p>
                                <p>{student.practiceName ? student.practiceName : "не указано"}</p>
                            </span>
                            <span>
                                <p>Практикуется (время): </p>
                                <p>{student.practiceTime ? student.practiceTime : "не указано"}</p>
                            </span>
                            <span>
                                <p>Выполняет функции: </p>
                                <p>{student.practiceFunctions ? student.practiceFunctions : "не указано"}</p>
                            </span>
                            <span>
                                <p>Проходит практику по специальности: </p>
                                <p>{student.practiceByProfession ? student.practiceByProfession : "не указано"}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <p>Сейчас работает: </p>
                                <p>{student.workName ? student.workName : "не указано"}</p>
                            </span>
                            <span>
                                <p>Работает (время): </p>
                                <p>{student.workTime ? student.workTime : "не указано"}</p>
                            </span>
                            <span>
                                <p>Выполняет функции: </p>
                                <p>{student.workFunctions ? student.workFunctions : "не указано"}</p>
                            </span>
                            <span>
                                <p>Работает по специальности: </p>
                                <p>{student.workByProfession ? student.workByProfession : "не указано"}</p>
                            </span>
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <span>
                            <p>Иностр. языки: </p>
                            <p>{student.launguages}</p>
                        </span>
                        <span>
                            <p>Проф. Навыки: </p>
                            <p>{student.professionalSkills}</p>
                        </span>
                        <span>
                            <p>Соц. навыки: </p>
                            <p>{student.socialSkills}</p>
                        </span>
                        <span>
                            <p>Образование: </p>
                            <p>{student.educations}</p>
                        </span>
                        <span>
                            <p>Пройденные курсы: </p>
                            <p>{student.courses}</p>
                        </span>
                        <span>
                            <p>Доп. навыки: </p>
                            <p>{student.additionalSkills}</p>
                        </span>
                        <span>
                            <p>Доп. Информация: </p>
                            <p>{student.additionalInfo}</p>
                        </span>
                        <span>
                            <p>Опыт работы: </p>
                            <p>{student.workExperience}</p>
                        </span>
                        <span>
                            <p>Награды: </p>
                            <p>{student.awards}</p>
                        </span>
                    </div>
                </section>
            </div >
        </main >
    )
}
