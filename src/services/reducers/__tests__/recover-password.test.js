import {
  RECOVER_PASSWORD_FAILED,
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS
} from '../../actions/recover-password'
import { recoverPasswordReducer } from '../recover-password'

const initialState = {
  recoverPasswordRequest: false,
  recoverPasswordSuccess: false,
  recoverPasswordFailed: false
}

describe('Redux recover-password test', () => {
  test('Should return the initial state', () => {
    expect(recoverPasswordReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle request', () => {
    expect(
      recoverPasswordReducer(undefined, {
        type: RECOVER_PASSWORD_REQUEST
      })
    ).toEqual({ ...initialState, recoverPasswordRequest: true })
  })

  test('Should handle success', () => {
    expect(
      recoverPasswordReducer(undefined, {
        type: RECOVER_PASSWORD_SUCCESS
      })
    ).toEqual({
      ...initialState,
      recoverPasswordRequest: false,
      recoverPasswordSuccess: true
    })
  })

  test('Should handle failed', () => {
    expect(
      recoverPasswordReducer(undefined, {
        type: RECOVER_PASSWORD_FAILED
      })
    ).toEqual({
      ...initialState,
      recoverPasswordRequest: false,
      recoverPasswordFailed: true
    })
  })
})
