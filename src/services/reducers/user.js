import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from '../actions/user'

const initialState = {
  loginRequest: false,
  loginFailed: false,
  loginSuccess: {
    success: true,
    accessToken: 'Bearer ...',
    refreshToken: '',
    user: {
      email: '',
      name: ''
    }
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loginRequest: true }

    case LOGIN_USER_SUCCESS:
      return { ...state, loginSuccess: action.data, loginRequest: false }

    case LOGIN_USER_FAILED:
      return { ...state, loginFailed: true, loginRequest: false }

    default:
      return state
  }
}
