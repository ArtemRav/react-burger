import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from '../actions/reset-password'

const initialState = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false
}

type TAction = {
  type:
    | typeof RESET_PASSWORD_FAILED
    | typeof RESET_PASSWORD_REQUEST
    | typeof RESET_PASSWORD_SUCCESS
}

export const resetPasswordReducer = (state = initialState, action: TAction) => {
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
