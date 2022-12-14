import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postData, saveTokens } from '../../utils/burger-api'
import style from './../LoginPage/login-page.module.css'

export const RegisterPage = () => {
  const history = useHistory()
  const [form, setValue] = useState({ name: '', email: '', password: '' })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const registerUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = postData('auth/register', form)
    if (response.success) {
      const { refreshToken, accessToken } = response
      history.replace({ pathname: '/' })
      saveTokens(refreshToken, accessToken)
    } else {
      history.replace({ pathname: '/login' })
    }
  }

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']} onSubmit={registerUser}>
        <h1 className={`text text_type_main-medium ${style.title}`}>
          Регистрация
        </h1>

        <div className="mt-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            size={'default'}
            value={form.name}
            name={'name'}
            onChange={onChange}
          />
        </div>

        <div className="mt-6">
          <EmailInput onChange={onChange} value={form.email} name={'email'} />
        </div>

        <div className="mt-6">
          <PasswordInput
            onChange={onChange}
            value={form.password}
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
