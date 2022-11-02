import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './../LoginPage/login-page.module.css'

export const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputEmail = e => {
    setEmail(e.target.value)
  }

  const inputPassword = e => {
    setPassword(e.target.value)
  }

  const inputName = e => {
    setName(e.target.value)
  }

  const registerUser = e => {
    e.preventDefault()
    const response = fetch(
      'https://norma.nomoreparties.space/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      }
    ).then(data => data.json())
    console.log('User created', response)
  }

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']}>
        <h1 className={`text text_type_main-medium ${style.title}`}>
          Регистрация
        </h1>

        <div className="mt-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            size={'default'}
            value={name}
            name={'name'}
            onChange={inputName}
          />
        </div>

        <div className="mt-6">
          <EmailInput onChange={inputEmail} value={email} name={'email'} />
        </div>

        <div className="mt-6">
          <PasswordInput
            onChange={inputPassword}
            value={password}
            name={'password'}
          />
        </div>

        <div className={`mt-6 ${style.submit}`}>
          <Button
            onClick={registerUser}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже заригстрированы?{' '}
        <Link
          className={`text text_type_main-default ${style.link}`}
          to="/login"
        >
          Войти
        </Link>
      </p>
    </div>
  )
}
