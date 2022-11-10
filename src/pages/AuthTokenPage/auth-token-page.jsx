import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserWithToken } from '../../services/actions/user'
import { getCookie } from '../../utils/cookie-helper'
import { useLocation } from 'react-router-dom'

export const AuthTokenPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { state } = useLocation()
  const isAutorized = useSelector(state => state.user.loginSuccess)

  const loginWithToken = useCallback(async () => {
    await dispatch(getUserWithToken())
    debugger
    if (isAutorized) {
      history.replace({ pathname: state.from })
    } else {
      history.replace({ pathname: '/login' })
    }
  }, [isAutorized, dispatch, history, state])

  useEffect(() => {
    if (getCookie('accessToken')) {
      loginWithToken()
    }
  }, [loginWithToken])
}
