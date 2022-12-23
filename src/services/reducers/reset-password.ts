import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  TResetPasswordActions
} from '../actions/reset-password'
import { TResetPassword } from '../types/data'

const initialState: TResetPassword = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false
}

export const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordActions
) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { ...state, resetPasswordRequest: true }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true
      }
    default:
      return state
  }
}
