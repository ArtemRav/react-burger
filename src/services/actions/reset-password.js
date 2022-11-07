import { postData } from '../../utils/burger-api'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'

export const resetPassword = data => async dispatch => {
  dispatch({ type: RESET_PASSWORD_REQUEST })
  try {
    const response = await postData('password-reset/reset', data)
    if (response.success) {
      dispatch({ type: RESET_PASSWORD_SUCCESS, data: response })
    } else {
      throw new Error('Error')
    }
  } catch (e) {
    dispatch({ type: RESET_PASSWORD_FAILED })
  }
}
