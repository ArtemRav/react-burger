import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { resetPassword } from '../../services/actions/reset-password'
import style from './../LoginPage/login-page.module.css'

export const ResetPassPage = ({ userReceived, isAutorized }) => {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()

  const inputPassword = e => {
    setPassword(e.target.value)
  }

  const inputToken = e => {
    setToken(e.target.value)
  }

  const isPasswordReseted = useSelector(
    state => state.resetPassword.resetPasswordSuccess
  )

  useEffect(() => {
    if (isPasswordReseted) {
      history.replace({ pathname: '/' })
    }
  })

  const dropPassword = () => {
    dispatch(resetPassword({ password, token }))
  }

  if (!userReceived) {
    return null
  }

  if (isAutorized) {
    return <Redirect to="/" />
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
            onClick={dropPassword}
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
