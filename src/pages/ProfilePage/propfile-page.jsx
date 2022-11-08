import style from './profile-page.module.css'
import { NavLink } from 'react-router-dom'
import {
  EmailInput,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'

export const ProfilePage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section className={style.wrapper}>
      <div className={`${style['left-side']} mr-15`}>
        <NavLink
          to="/profile"
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/logout"
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          Выход
        </NavLink>

        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className={style['right-side']}>
        <div className="mt-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            size={'default'}
            value={form.name}
            name={'name'}
            icon="EditIcon"
            onChange={onChange}
          />
        </div>

        <div className="mt-6">
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            icon="EditIcon"
          />
        </div>

        <div className="mt-6">
          <Input
            type={'password'}
            placeholder={'Пароль'}
            size={'default'}
            onChange={onChange}
            value={form.password}
            name={'password'}
            icon="EditIcon"
          />
        </div>
      </div>

      <div className={`${style['left-side']} mr-15`}></div>
    </section>
  )
}
