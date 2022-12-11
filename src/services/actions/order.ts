import { postData } from '../../utils/burger-api'
import { AppDispatch } from '../types'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST
}

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS
  orderNum: string
}

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED
}

export type TOrderActions =
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction

export const getOrder = (data: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_ORDER_REQUEST })

  try {
    const {
      order: { number }
    } = await postData('orders', data)
    dispatch({
      type: GET_ORDER_SUCCESS,
      orderNum: number
    })
  } catch (error) {
    dispatch({ type: GET_ORDER_FAILED })
    console.error(error)
  }
}
