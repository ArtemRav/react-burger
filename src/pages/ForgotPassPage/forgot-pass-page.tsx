import {
  Button,
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { recoverPassword } from '../../services/actions/recover-password'
import { TState } from '../../services/reducers'
import style from './../LoginPage/login-page.module.css'

export const ForgotPassPage = () => {
  const [email, setEmail] = useState('')
  const history = useHistory()
  const dispatch = useDispatch<any>()

  const inputEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const isPasswordRecovered = useSelector(
    (state: TState) => state.recoverPassword.recoverPasswordSuccess
  )

  useEffect(() => {
    if (isPasswordRecovered) {
      history.replace({ pathname: '/reset-password' })
    }
  }, [isPasswordRecovered, history])

  const updatePassword = async () => {
    dispatch(recoverPassword({ email }))
  }

  return (
    <div className={style.wrapper}>
      <form className={style['auth-form']}>
        <h1 className={`text text_type_main-medium ${style.title}`}>
          Восстановление пароля
        </h1>

        <div className="mt-6">
          <EmailInput onChange={inputEmail} value={email} name={'E-mail'} />
        </div>

        <div className={`mt-6 ${style.submit}`}>
          <Button
            onClick={updatePassword}
            htmlType="button"
            type="primary"
            size="medium"
          >
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
