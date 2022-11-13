import { getDataWithToken, postData, saveTokens } from '../../utils/burger-api'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'
export const TOGGLE_USER_AUTH_CHECKED = 'TOGGLE_USER_AUTH_CHECKED'

export const getUser = data => async dispatch => {
  dispatch({ type: GET_USER_REQUEST })
  try {
    const res = await postData('auth/login', data)
    if (res.success) {
      const { refreshToken, accessToken, user } = res

      dispatch({ type: GET_USER_SUCCESS, payload: user })
      saveTokens(refreshToken, accessToken)
    } else {
      throw new Error('Error')
    }
  } catch (err) {
    dispatch({ type: GET_USER_FAILED })
  }
}

export const getUserWithToken = () => async dispatch => {
  dispatch({ type: GET_USER_REQUEST })
  try {
    const res = await getDataWithToken('auth/user')
    if (res.success) {
      dispatch({ type: GET_USER_SUCCESS, payload: res.user })
    } else {
      throw new Error('Error')
    }
  } catch (err) {
    dispatch({ type: GET_USER_FAILED })
  }
}
