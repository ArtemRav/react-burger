import {
  Button,
  EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import style from './../LoginPage/login-page.module.css'

export const ForgotPassPage = () => {
  const [email, setEmail] = useState('')
  const history = useHistory()

  const inputEmail = e => {
    setEmail(e.target.value)
  }

  const recoverPassword = async () => {
    const { success } = await fetch(
      'https://norma.nomoreparties.space/api/password-reset',
      {
        method: 'POST',
        body: JSON.stringify({ email })
      }
    ).then(data => data.json())
    if (success) {
      history.replace({ pathname: '/reset-password' })
    }
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
            onClick={recoverPassword}
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
