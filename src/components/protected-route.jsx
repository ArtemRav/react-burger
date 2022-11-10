import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ children, ...rest }) => {
  const isAutorized = useSelector(state => state.user.loginSuccess)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAutorized ? (
          children
        ) : (
          <Redirect
            to={{ pathname: '/auth-token', state: { from: location.pathname } }}
          />
        )
      }}
    />
  )
}
