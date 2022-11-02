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

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']}>
        <h1 className={`text text_type_main-medium mb-6 ${style.title}`}>
          Регистрация
        </h1>

        <div className="mt-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            size={'default'}
            value={name}
            onChange={setName}
          />
        </div>

        <div className="mt-6">
          <EmailInput onChange={inputEmail} value={email} name={'E-mail'} />
        </div>

        <div className="mt-6">
          <PasswordInput
            onChange={inputPassword}
            value={password}
            name={'password'}
          />
        </div>

        <div className={`mt-6 ${style.submit}`}>
          <Button htmlType="submit" type="primary" size="medium">
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
