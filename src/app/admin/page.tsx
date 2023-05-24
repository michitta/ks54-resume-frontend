"use client";

import styles from '@/styles/admin.module.scss'
import { useAuth } from '@/components/auth.context';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { usersService } from '@/services/users.service';

export default function Admin() {
  const [data, setData] = useState(null);

  useMemo(async () => {
    // setData(await usersService.getById(1))
  }, [data])
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { user } = useAuth();

  const onSubmit = (data: any) => {
    (data?.username && data?.password) && console.log(data);
  };
  return (
    user &&
    <main className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <p>Добро пожаловать в редактор резюме, {user.username}</p>
        </div>
        <div>
          <div className={styles.data}>
            <div>
              <span className='flex flex-col gap-[10px]'>
                <p>Надюков М.Р</p>
                <p>Профессия: Программист</p>
              </span>
            </div>
            <div>
              <span>
                <p>Год рождения</p>
                <p>: 18.01.2004</p>
              </span>
              <span>
                <p>Группа</p>
                <p>: 2-ИСП11-19</p>
              </span>
              <span>
                <p>Номер телефона</p>
                <p>: +79268832840</p>
              </span>
            </div>
            <div>
              <span>
                <p>Email</p>
                <p>: uwu@uwu.uwu</p>
              </span>
              <span>
                <p>Telegram</p>
                <p>: @FluffyCuteOwO</p>
              </span>
              <span>
                <p>Вод. Удостоверение</p>
                <p>: Категория B</p>
              </span>
            </div>
            <div>
              <span>
                <p>Факультет</p>
                <p>: Сергеевский</p>
              </span>
              <span>
                <p>Форма обучения</p>
                <p>: Очная</p>
              </span>
              <span>
                <p>Город проживания</p>
                <p>: Москва</p>
              </span>
              <span>
                <p>Год завершения обучения</p>
                <p>: 2023</p>
              </span>
            </div>
          </div>
          <div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
          </div>
          <div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
          </div>
        </div>
      </form>
    </main>
  )
}