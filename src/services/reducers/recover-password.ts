import {
  RECOVER_PASSWORD_FAILED,
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  TRecoverPasswordActions
} from '../actions/recover-password'

const initialState = {
  recoverPasswordRequest: false,
  recoverPasswordSuccess: false,
  recoverPasswordFailed: false
}

export const recoverPasswordReducer = (
  state = initialState,
  action: TRecoverPasswordActions
) => {
  switch (action.type) {
    case RECOVER_PASSWORD_REQUEST:
      return { ...state, recoverPasswordRequest: true }
    case RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        recoverPasswordRequest: false,
        recoverPasswordSuccess: true
      }
    case RECOVER_PASSWORD_FAILED:
      return {
        ...state,
        recoverPasswordRequest: false,
        recoverPasswordFailed: true
      }
    default:
      return state
  }
}
