import {
  Button,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './login-page.module.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputEmail = e => {
    setEmail(e.target.value)
  }

  const inputPassword = e => {
    setPassword(e.target.value)
  }

  return (
    <div className={style.wrapper}>
      <form>
        <h1 className="text text_type_main-medium">Вход</h1>

        <EmailInput
          className="mt-6"
          onChange={inputEmail}
          value={email}
          name={'E-mail'}
        />

        <PasswordInput
          className="mt-6"
          onChange={inputPassword}
          value={password}
          name={'password'}
        />

        <Button className="mt-6" type="primary" size="medium">
          Войти
        </Button>
      </form>

      <p className="mt-20">
        Вы - новый пользователь? <Link to="/">Зарегистрироваться</Link>
      </p>
      <p className="mt-4">
        Забыли пароль? <Link to="/resetpassword">Восстановить пароль</Link>
      </p>
    </div>
  )
}
