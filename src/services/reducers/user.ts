import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  TOGGLE_USER_AUTH_CHECKED
} from '../actions/user'

const initialState = {
  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,
  isAuthChecked: false,

  userInfo: null
}

type TAction = {
  type:
    | typeof GET_USER_REQUEST
    | typeof GET_USER_SUCCESS
    | typeof GET_USER_FAILED
    | typeof TOGGLE_USER_AUTH_CHECKED
  payload?: any
  isAuthChecked?: boolean
}

export const userReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loginRequest: true }

    case GET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loginRequest: false,
        loginSuccess: true,
        loginFailed: false
      }

    case GET_USER_FAILED:
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        loginSuccess: false,
        userInfo: null
      }

    case TOGGLE_USER_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: !state.isAuthChecked
      }

    default:
      return state
  }
}
