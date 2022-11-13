/* eslint-disable no-undef */
import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../../services/actions/user'
import style from './login-page.module.css'

export const LoginPage = () => {
  const [form, setValue] = useState({ email: '', password: '' })
  const dispatch = useDispatch()

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const login = useCallback(
    async e => {
      e.preventDefault()
      await dispatch(getUser(form))
    },
    [dispatch, form]
  )

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']}>
        <h1 className={`text text_type_main-medium ${style.title}`}>Вход</h1>

        <div className="mt-6">
          <EmailInput value={form.email} name={'email'} onChange={onChange} />
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
  )
}
