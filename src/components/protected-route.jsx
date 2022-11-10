import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { getUserWithToken } from '../services/actions/user'
import { getCookie } from '../utils/cookie-helper'

export const ProtectedRoute = ({ children, ...rest }) => {
  const isAutorized = useSelector(state => state.user.loginSuccess)

  const dispatch = useDispatch()

  const loginWithToken = useCallback(async () => {
    await dispatch(getUserWithToken())
  }, [dispatch])

  useEffect(() => {
    if (!isAutorized && getCookie('accessToken')) {
      loginWithToken()
    }
  }, [loginWithToken, isAutorized])

  return (
    <Route
      {...rest}
      render={({ pathname }) => {
        return isAutorized ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: pathname } }} />
        )
      }}
    />
  )
}
