import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  TOGGLE_USER_AUTH_CHECKED
} from '../../actions/user'
import { userReducer } from '../user'

const initialState = {
  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,
  isAuthChecked: false,
  userInfo: {
    name: '',
    email: '',
    password: ''
  }
}

describe('Redux auth reducer', () => {
  test('Should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle request', () => {
    expect(userReducer(undefined, { type: GET_USER_REQUEST })).toEqual({
      ...initialState,
      loginRequest: true
    })
  })

  test('Should handle success', () => {
    const userInfo = { name: 'Artem', email: 'gp@lol.com', password: 'gagaga' }
    expect(
      userReducer(undefined, { type: GET_USER_SUCCESS, payload: userInfo })
    ).toEqual({
      ...initialState,
      loginSuccess: true,
      userInfo
    })
  })

  test('Should handle failed', () => {
    expect(userReducer(undefined, { type: GET_USER_FAILED })).toEqual({
      ...initialState,
      loginFailed: true,
      loginRequest: false,
      loginSuccess: false
    })
  })

  test('Should handle checked', () => {
    expect(userReducer(undefined, { type: TOGGLE_USER_AUTH_CHECKED })).toEqual({
      ...initialState,
      isAuthChecked: !initialState.isAuthChecked
    })
  })
})
