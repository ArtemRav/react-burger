import { getOrderByNumber } from '../../utils/burger-api'
import { AppDispatch } from '../types'
import { THistoryOrderItem } from '../types/data'

export const GET_ORDER_MAKED_REQUEST = 'GET_ORDER_MAKED_REQUEST'
export const GET_ORDER_MAKED_SUCCESS = 'GET_ORDER_MAKED_SUCCESS'
export const GET_ORDER_MAKED_FAILED = 'GET_ORDER_MAKED_FAILED'

export type TGetOrderMakedRequestAction = {
  readonly type: typeof GET_ORDER_MAKED_REQUEST
}

export type TGetOrderMakedSuccessAction = {
  readonly type: typeof GET_ORDER_MAKED_SUCCESS
  payload: THistoryOrderItem
}

export type TGetOrderMakedFailedAction = {
  readonly type: typeof GET_ORDER_MAKED_FAILED
}

export type TOrderMakedActions =
  | TGetOrderMakedRequestAction
  | TGetOrderMakedSuccessAction
  | TGetOrderMakedFailedAction

export const getOrderMaked =
  (number: number | string) => async (dispatch: AppDispatch) => {
    dispatch({ type: GET_ORDER_MAKED_REQUEST })

    try {
      const { success, orders } = await getOrderByNumber(number)
      if (!success) {
        throw new Error(
          'Не удалось получить информацию по переданному номеру заказа.'
        )
      }
      dispatch({
        type: GET_ORDER_MAKED_SUCCESS,
        payload: orders[0]
      })
    } catch (error) {
      dispatch({ type: GET_ORDER_MAKED_FAILED })
      console.error(error)
    }
  }
