import { postData } from '../../utils/burger-api'
import { AppDispatch } from '../types'

export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST'
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS'
export const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED'

type TData = { email: string }

export type TRecoverPasswordRequestAction = {
  readonly type: typeof RECOVER_PASSWORD_REQUEST
}

export type TRecoverPasswordSuccessAction = {
  readonly type: typeof RECOVER_PASSWORD_SUCCESS
}

export type TRecoverPasswordFailedAction = {
  readonly type: typeof RECOVER_PASSWORD_FAILED
}

export type TRecoverPasswordActions =
  | TRecoverPasswordRequestAction
  | TRecoverPasswordSuccessAction
  | TRecoverPasswordFailedAction

export const recoverPassword =
  (data: TData) => async (dispatch: AppDispatch) => {
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
