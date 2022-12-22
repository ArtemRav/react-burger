import { postData } from '../../utils/burger-api'
import { AppDispatch } from '../types'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'

type TData = { password: string; token: string }

export type TResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

export type TResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

export type TResetPasswordFailedAction = {
  readonly type: typeof RESET_PASSWORD_FAILED
}

export type TResetPasswordActions =
  | TResetPasswordRequestAction
  | TResetPasswordSuccessAction
  | TResetPasswordFailedAction

export const resetPassword = (data: TData) => async (dispatch: AppDispatch) => {
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
