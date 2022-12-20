import {
  Button,
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { recoverPassword } from '../../services/actions/recover-password'
import style from './../LoginPage/login-page.module.css'

export const ForgotPassPage = () => {
  const [email, setEmail] = useState('')
  const history = useHistory()
  const dispatch = useAppDispatch()

  const inputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const isPasswordRecovered = useAppSelector(
    state => state.recoverPassword.recoverPasswordSuccess
  )

  useEffect(() => {
    if (isPasswordRecovered) {
      history.replace({ pathname: '/reset-password' })
    }
  }, [isPasswordRecovered, history])

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    dispatch(recoverPassword({ email }))
  }

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']} onSubmit={updatePassword}>
        <h1 className={`text text_type_main-medium ${style.title}`}>
          Восстановление пароля
        </h1>

        <div className="mt-6">
          <EmailInput onChange={inputEmail} value={email} name={'E-mail'} />
        </div>

        <div className={`mt-6 ${style.submit}`}>
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
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
