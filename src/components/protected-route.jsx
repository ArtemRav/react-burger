import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'
import {
  getUserWithToken,
  TOGGLE_USER_AUTH_CHECKED
} from '../services/actions/user'
import { Preloader } from './Preloader/Preloader'

export const ProtectedRoute = ({ children, onlyUnAuth = false, ...rest }) => {
  const isAuthChecked = useSelector(state => state.user.isAuthChecked)
  const isAutorized = useSelector(state => state.user.loginSuccess)
  const location = useLocation()
  const dispatch = useDispatch()

  const init = useCallback(async () => {
    await dispatch(getUserWithToken())
    if (!isAuthChecked) {
      dispatch({ type: TOGGLE_USER_AUTH_CHECKED })
    }
  }, [dispatch, isAuthChecked])

  useEffect(() => {
    init()
  }, [init])

  if (!isAuthChecked) {
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
