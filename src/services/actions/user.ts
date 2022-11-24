import { Dispatch } from 'react'
import { getDataWithToken, postData, saveTokens } from '../../utils/burger-api'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

type TData = {
  email: string
  password: string
}

type TGetUser = {
  type:
    | typeof GET_USER_REQUEST
    | typeof GET_USER_SUCCESS
    | typeof GET_USER_FAILED
  payload?: any
}

type TGetUserWithToken = {
  type:
    | typeof GET_USER_REQUEST
    | typeof GET_USER_SUCCESS
    | typeof GET_USER_FAILED
  payload?: any
}

export const getUser =
  (data: TData) => async (dispatch: Dispatch<TGetUser>) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
      const res: any = await postData('auth/login', data)
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

export const getUserWithToken =
  () => async (dispatch: Dispatch<TGetUserWithToken>) => {
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
