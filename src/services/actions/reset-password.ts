import { Dispatch } from 'react'
import { postData } from '../../utils/burger-api'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'

type TData = { password: string; token: string }

type TResetPassword = {
  type:
    | typeof RESET_PASSWORD_REQUEST
    | typeof RESET_PASSWORD_SUCCESS
    | typeof RESET_PASSWORD_FAILED
  data?: any
}

export const resetPassword =
  (data: TData) => async (dispatch: Dispatch<TResetPassword>) => {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    try {
      const response: any = await postData('password-reset/reset', data)
      if (response.success) {
        dispatch({ type: RESET_PASSWORD_SUCCESS, data: response })
      } else {
        throw new Error('Error')
      }
    } catch (e) {
      dispatch({ type: RESET_PASSWORD_FAILED })
    }
  }
