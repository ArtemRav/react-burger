import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './../LoginPage/login-page.module.css'

export const ResetPassPage = () => {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const inputPassword = e => {
    setPassword(e.target.value)
  }

  const inputToken = e => {
    setToken(e.target.value)
  }

  const resetPassword = () => {
    const { success } = fetch(
      'https://norma.nomoreparties.space/api/password-reset',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
      }
    ).then(data => data.json())
    console.log(success)
  }

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']}>
        <h1 className={`text text_type_main-medium ${style.title}`}>
          Восстановление пароля
        </h1>

        <div className="mt-6">
          <PasswordInput
            onChange={inputPassword}
            value={password}
            name={'password'}
          />
        </div>

        <div className="mt-6">
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            size={'default'}
            value={token}
            onChange={inputToken}
          />
        </div>

        <div className={`mt-6 ${style.submit}`}>
          <Button
            onClick={resetPassword}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Восстановить пароль{' '}
        <Link
          className={`text text_type_main-default ${style.link}`}
          to="/register"
        >
          Войти
        </Link>
      </p>
    </div>
  )
}
