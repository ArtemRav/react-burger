import style from './profile-page.module.css'
import { NavLink, Route, Switch, useLocation } from 'react-router-dom'
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components'
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'
import { logOut, patchData } from '../../utils/burger-api'
import { FeedOrders } from '../../components/FeedOrders/FeedOrders'
import { getCookie } from '../../utils/cookie-helper'
import {
  USER_CONNECTION_CLOSE,
  USER_CONNECTION_INIT
} from '../../services/actions/user-orders'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const ProfilePage = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const routeParams = useLocation()

  const [form, setValue] = useState({ name: '', email: '', password: '' })
  const [hasControls, setControls] = useState(false)
  const { email, name } = useAppSelector(state => state.user.userInfo)

  const isCreated = useAppSelector(state => state.userOrders.isCreated)
  const isConnected = useAppSelector(state => state.userOrders.isOpen)
  const userOrdersList = useAppSelector(state => state.userOrders.orders)

  useEffect(() => {
    if (
      routeParams.pathname === '/profile/orders' &&
      !isCreated &&
      !isConnected
    ) {
      dispatch({
        type: USER_CONNECTION_INIT,
        wsUrl: `?token=${getCookie('accessToken')}`
      })
    }

    return () => {
      if (isConnected) {
        dispatch({
          type: USER_CONNECTION_CLOSE
        })
      }
    }
  }, [dispatch, isConnected, isCreated, routeParams])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
    if (!hasControls) {
      setControls(true)
    }
  }

  useEffect(() => {
    if (!form.name) {
      setValue({ ...form, name })
    }
    if (!form.email) {
      setValue({ ...form, email })
    }
  }, [form, name, email])

  const postUserData = useCallback(
    async (event: SyntheticEvent<Element, Event>) => {
      await patchData('auth/user', form)
      setControls(false)
    },
    [form]
  )

  const returnUserData = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      setValue({ ...form, email, name })
      setControls(false)
    },
    [form, email, name]
  )

  const logoutUser = useCallback(
    async (event: SyntheticEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      await logOut()
      history.replace({ pathname: '/login', state: { from: '/login' } })
    },
    [history]
  )

  return (
    <section className={style.wrapper}>
      <div className={`${style['left-side']} mr-15`}>
        <NavLink
          to="/profile"
          exact
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          exact
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          exact
          onClick={logoutUser}
          className={`text text_type_main-medium text_color_inactive ${style.link}`}
          activeClassName={style['active-link']}
        >
          Выход
        </NavLink>

        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className={style['right-side']}>
        <Switch>
          <Route path="/profile" exact={true}>
            <div className="mt-6">
              <Input
                type={'text'}
                placeholder={'Имя'}
                size={'default'}
                value={form.name}
                name={'name'}
                icon="EditIcon"
                autoComplete="off"
                onChange={onChange}
              />
            </div>

            <div className="mt-6">
              <Input
                type={'email'}
                placeholder={'Логин'}
                size={'default'}
                value={form.email}
                name={'email'}
                icon="EditIcon"
                autoComplete="off"
                onChange={onChange}
              />
            </div>

            <div className="mt-6">
              <Input
                type={'password'}
                placeholder={'Пароль'}
                size={'default'}
                value={form.password}
                name={'password'}
                icon="EditIcon"
                autoComplete="off"
                onChange={onChange}
              />
            </div>

            {hasControls && (
              <div className={`mt-6 ${style.controls}`}>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="large"
                  onClick={returnUserData}
                >
                  Отмена
                </Button>
                <Button
                  htmlType="button"
                  type="primary"
                  size="large"
                  onClick={postUserData}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </Route>
        </Switch>

        <Switch>
          <Route path="/profile/orders" exact={true}>
            <FeedOrders ordersList={userOrdersList} route="/profile/orders" />
          </Route>
        </Switch>
      </div>

      <div className={`${style['left-side']} mr-15`}></div>
    </section>
  )
}
