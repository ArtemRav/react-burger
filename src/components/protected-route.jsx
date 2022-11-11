import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { getUserWithToken } from '../services/actions/user'

export const ProtectedRoute = ({ children, ...rest }) => {
  const isAutorized = useSelector(state => state.user.loginSuccess)
  const [userReceived, setUserReceived] = useState(false)
  const dispatch = useDispatch()

  const init = useCallback(async () => {
    await dispatch(getUserWithToken())
    setUserReceived(true)
  }, [dispatch])

  useEffect(() => {
    init()
  }, [init])

  if (!userReceived) {
    return null
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAutorized ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}
