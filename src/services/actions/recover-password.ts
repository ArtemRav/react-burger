import { Dispatch } from 'react'
import { postData } from '../../utils/burger-api'

export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST'
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS'
export const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED'

type TData = { email: string }

type TRecoverPassword = {
  type:
    | typeof RECOVER_PASSWORD_REQUEST
    | typeof RECOVER_PASSWORD_SUCCESS
    | typeof RECOVER_PASSWORD_FAILED
  data?: any
}

export const recoverPassword =
  (data: TData) => async (dispatch: Dispatch<TRecoverPassword>) => {
    dispatch({ type: RECOVER_PASSWORD_REQUEST })
    try {
      const response: any = await postData('password-reset', data)
      if (response.success) {
        dispatch({ type: RECOVER_PASSWORD_SUCCESS, data: response })
      } else {
        throw new Error('Error')
      }
    } catch (e) {
      dispatch({ type: RECOVER_PASSWORD_FAILED })
    }
  }
