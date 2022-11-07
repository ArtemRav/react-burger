import { postData } from '../../utils/burger-api'

export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST'
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS'
export const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED'

export const recoverPassword = data => async dispatch => {
  dispatch({ type: RECOVER_PASSWORD_REQUEST })
  try {
    const response = await postData('password-reset', data)
    if (response.success) {
      dispatch({ type: RECOVER_PASSWORD_SUCCESS, data: response })
    } else {
      throw new Error('Error')
    }
  } catch (e) {
    dispatch({ type: RECOVER_PASSWORD_FAILED })
  }
}
