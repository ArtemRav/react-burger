import { FC, ReactNode, useCallback, useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getUserWithToken,
  TOGGLE_USER_AUTH_CHECKED
} from '../services/actions/user'
import { Preloader } from './Preloader/Preloader'

type TProtectedRoute = {
  onlyUnAuth?: boolean
  children: ReactNode
  path: string
  exact?: boolean
}

type LocationState = {
  from: {
    pathname: string
  }
}

export const ProtectedRoute: FC<TProtectedRoute> = ({
  children,
  onlyUnAuth = false,
  ...rest
}) => {
  const isAuthChecked = useAppSelector(state => state.user.isAuthChecked)
  const isAutorized = useAppSelector(state => state.user.loginSuccess)
  const location = useLocation<LocationState>()
  const dispatch = useAppDispatch()

  const init = useCallback(async () => {
    await dispatch(getUserWithToken())
    if (!isAuthChecked) {
      dispatch({ type: TOGGLE_USER_AUTH_CHECKED })
    }
  }, [dispatch, isAuthChecked])

  useEffect(() => {
    if (!onlyUnAuth) {
      init()
    }
  }, [onlyUnAuth, init])

  if (!isAuthChecked && !onlyUnAuth) {
    return <Preloader />
  }

  if (onlyUnAuth && isAutorized) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }

  if (!onlyUnAuth && !isAutorized) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )
  }

  return <Route {...rest}>{children}</Route>
}
