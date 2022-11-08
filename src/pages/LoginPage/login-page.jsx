import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../../services/actions/user'
import style from './login-page.module.css'
import { useHistory } from 'react-router-dom'

export const LoginPage = () => {
  const [form, setValue] = useState({ email: '', password: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const login = async e => {
    e.preventDefault()
    await dispatch(getUser(form))
    history.replace({ pathname: '/' })
  }

  const isAuthentication = useSelector(state => state.loginRequest)

  return (
    <>
      {!isAuthentication && (
        <div className={style.wrapper}>
          <form className={style['auth-form']}>
            <h1 className={`text text_type_main-medium ${style.title}`}>
              Вход
            </h1>

            <div className="mt-6">
              <EmailInput
                value={form.email}
                name={'email'}
                onChange={onChange}
              />
            </div>

            <div className="mt-6">
              <PasswordInput
                value={form.password}
                name={'password'}
                onChange={onChange}
              />
            </div>

            <div className={`mt-6 ${style.submit}`}>
              <Button
                htmlType="submit"
                type="primary"
                size="medium"
                onClick={login}
              >
                Войти
              </Button>
            </div>
          </form>

          <p className="text text_type_main-default text_color_inactive mt-20">
            Вы - новый пользователь?{' '}
            <Link
              className={`text text_type_main-default ${style.link}`}
              to="/register"
            >
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive mt-4">
            Забыли пароль?{' '}
            <Link
              className={`text text_type_main-default ${style.link}`}
              to="/forgot-password"
            >
              Восстановить пароль
            </Link>
          </p>
        </div>
      )}
      {isAuthentication && (
        <p className="text text_type_digits-medium">Идет авторизация...</p>
      )}
    </>
  )
}
