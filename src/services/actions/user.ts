import { getDataWithToken, postData, saveTokens } from '../../utils/burger-api'
import { AppDispatch } from '../types'
import { TUser } from '../types/data'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'
export const TOGGLE_USER_AUTH_CHECKED = 'TOGGLE_USER_AUTH_CHECKED'

export type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST
}

export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS
  payload: TUser
}

export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED
}

export type TToggleUserAuthCheckedAction = {
  readonly type: typeof TOGGLE_USER_AUTH_CHECKED
}

export type TUserActions =
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TToggleUserAuthCheckedAction

export const getUser = (data: TUser) => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST })
  try {
    const res = await postData('auth/login', data)
    if (res.success) {
      const { refreshToken, accessToken, user } = res

      dispatch({ type: GET_USER_SUCCESS, payload: user })
      saveTokens(refreshToken, accessToken)
    } else {
      throw new Error('Error')
    }
  } catch (err) {
    dispatch({ type: GET_USER_FAILED })
  }
}

export const getUserWithToken = () => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST })
  try {
    const res = await getDataWithToken('auth/user')
    if (res.success) {
      dispatch({ type: GET_USER_SUCCESS, payload: res.user })
    } else {
      throw new Error('Error')
    }
  } catch (err) {
    dispatch({ type: GET_USER_FAILED })
  }
}
