import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from '../../actions/reset-password'
import { resetPasswordReducer } from '../reset-password'

const initialState = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false
}

describe('Redux reset-password test', () => {
  test('Should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle request', () => {
    expect(
      resetPasswordReducer(undefined, { type: RESET_PASSWORD_REQUEST })
    ).toEqual({
      ...initialState,
      resetPasswordRequest: true
    })
  })

  test('Should handle success', () => {
    expect(
      resetPasswordReducer(undefined, { type: RESET_PASSWORD_SUCCESS })
    ).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordSuccess: true
    })
  })

  test('Should handle failed', () => {
    expect(
      resetPasswordReducer(undefined, { type: RESET_PASSWORD_FAILED })
    ).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: true
    })
  })
})
