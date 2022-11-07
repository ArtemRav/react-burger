import { postData } from '../../utils/burger-api'
import setCookie from '../../utils/set-cookie'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'

export const loginUser = data => async dispatch => {
  dispatch({ type: LOGIN_USER_REQUEST })
  try {
    const response = await postData('auth/login', data)
    if (response.success) {
      dispatch({ type: LOGIN_USER_SUCCESS, data: response })
      setCookie('refresh-token', response.refreshToken, { expires: 120 })
    } else {
      throw new Error('Error')
    }
  } catch (e) {
    dispatch({ type: LOGIN_USER_FAILED })
  }
}
