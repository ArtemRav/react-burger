import style from './profile-page.module.css'
import { NavLink, Route, Switch } from 'react-router-dom'
import {
  Button,
  EmailInput,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProfileOrders } from '../ProfileOrders/profile-orders'
import { patchData } from '../../utils/burger-api'

export const ProfilePage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' })

  const { email, name } = useSelector(state => state.user.userInfo)

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!form.name) {
      setValue({ ...form, name })
    }
    if (!form.email) {
      setValue({ ...form, email })
    }
  }, [form, name, email])

  const postUserData = useCallback(() => patchData('auth/user', form), [form])
  const returnUserData = useCallback(
    () => setValue({ ...form, email, name }),
    [form, email, name]
  )

  // Вопрос ревьюверу: почему-то первый NavLink всегда active, не удалось разобраться
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
        <Switch>
          <Route path="/profile" exact={true}>
            <div className="mt-6">
              <Input
                type={'text'}
                placeholder={'Имя'}
                size={'default'}
                value={form.name}
                name={'name'}
                icon="EditIcon"
                autoComplete="off"
                onChange={onChange}
              />
            </div>

            <div className="mt-6">
              <EmailInput
                type={'email'}
                placeholder={'Логин'}
                size={'default'}
                value={form.email}
                name={'email'}
                icon="EditIcon"
                autoComplete="off"
                onChange={onChange}
              />
            </div>

            <div className="mt-6">
              <Input
                type={'password'}
                placeholder={'Пароль'}
                size={'default'}
                value={form.password}
                name={'password'}
                icon="EditIcon"
                autoComplete="off"
                onChange={onChange}
              />
            </div>

            <div className={`mt-6 ${style.controls}`}>
              <Button
                htmlType="button"
                type="secondary"
                size="large"
                onClick={returnUserData}
              >
                Отмена
              </Button>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={postUserData}
              >
                Сохранить
              </Button>
            </div>
          </Route>
        </Switch>

        <Switch>
          <Route path="/profile/orders">
            <ProfileOrders />
          </Route>
        </Switch>
      </div>

      <div className={`${style['left-side']} mr-15`}></div>
    </section>
  )
}
