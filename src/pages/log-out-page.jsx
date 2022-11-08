import { logOut } from '../utils/burger-api'
import { Redirect } from 'react-router-dom'

export const LogoutPage = () => {
  logOut()

  return <Redirect to="/login" />
}
