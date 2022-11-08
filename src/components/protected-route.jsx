import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ children, ...rest }) => {
  const isUserLogined = useSelector(state => state.user.loginSuccess)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isUserLogined ? (
          children
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: location.pathname } }}
          />
        )
      }}
    />
  )
}
