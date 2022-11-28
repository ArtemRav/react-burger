import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { resetPassword } from '../../services/actions/reset-password'
import { TState } from '../../services/reducers'
import style from './../LoginPage/login-page.module.css'

export const ResetPassPage = () => {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const history = useHistory()
  const dispatch = useDispatch<any>()

  const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const inputToken = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value)
  }

  const isPasswordReseted = useSelector(
    (state: TState) => state.resetPassword.resetPasswordSuccess
  )

  useEffect(() => {
    if (isPasswordReseted) {
      history.replace({ pathname: '/' })
    }
  })

  const dropPassword = (event: FormEvent<HTMLFormElement>) => {
    dispatch(resetPassword({ password, token }))
  }

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']} onSubmit={dropPassword}>
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
          <Button htmlType="button" type="primary" size="medium">
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
