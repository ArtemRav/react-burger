import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../actions/user'

const initialState = {
  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  userInfo: {
    email: '',
    name: ''
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loginRequest: true }

    case GET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loginRequest: false,
        loginSuccess: true
      }

    case GET_USER_FAILED:
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        loginSuccess: false
      }

    default:
      return state
  }
}
