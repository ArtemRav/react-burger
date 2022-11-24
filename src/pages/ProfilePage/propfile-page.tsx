import style from './profile-page.module.css'
import { NavLink, Route, Switch } from 'react-router-dom'
import {
  Button,
  EmailInput,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProfileOrders } from '../ProfileOrders/profile-orders'
import { logOut, patchData } from '../../utils/burger-api'
import { TState } from '../../services/reducers'

export const ProfilePage = () => {
  const history = useHistory()
  const [form, setValue] = useState({ name: '', email: '', password: '' })
  const [hasControls, setControls] = useState(false)

  const { email, name } = useSelector((state: TState) => state.user.userInfo)

  const onChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value })
    if (!hasControls) {
      setControls(true)
    }
  }

  useEffect(() => {
    if (!form.name) {
      setValue({ ...form, name })
    }
    if (!form.email) {
      setValue({ ...form, email })
    }
  }, [form, name, email])

  const postUserData = useCallback(async () => {
    await patchData('auth/user', form)
    setControls(false)
  }, [form])

  const returnUserData = useCallback(() => {
    setValue({ ...form, email, name })
    setControls(false)
  }, [form, email, name])

  const logoutUser = useCallback(
    async (event: any) => {
      event.preventDefault()
      await logOut()
      history.replace({ pathname: '/login', state: { from: '/login' } })
    },
    [history]
  )

  return (
    <section className={style.wrapper}>
      <div className={`${style['left-side']} mr-15`}>
        <NavLink
          to="/profile"
          exact
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          exact
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          exact
          onClick={logoutUser}
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

            {hasControls && (
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
            )}
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
