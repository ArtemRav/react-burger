import { getOrderByNumber } from '../../utils/burger-api'
import { AppDispatch } from '../types'
import { TOrdersListItem } from '../types/data'

export const FEED_ORDERS_ITEM_REQUEST = 'FEED_ORDERS_ITEM_REQUEST'
export const FEED_ORDERS_ITEM_SUCCESS = 'FEED_ORDERS_ITEM_SUCCESS'
export const FEED_ORDERS_ITEM_FAILED = 'FEED_ORDERS_ITEM_FAILED'

export type TGetOrderMakedRequestAction = {
  readonly type: typeof FEED_ORDERS_ITEM_REQUEST
}

export type TGetOrderMakedSuccessAction = {
  readonly type: typeof FEED_ORDERS_ITEM_SUCCESS
  payload: TOrdersListItem
}

export type TGetOrderMakedFailedAction = {
  readonly type: typeof FEED_ORDERS_ITEM_FAILED
}

export type TFeedOrdersItem =
  | TGetOrderMakedRequestAction
  | TGetOrderMakedSuccessAction
  | TGetOrderMakedFailedAction

export const getOrderMaked =
  (number: number | string) => async (dispatch: AppDispatch) => {
    dispatch({ type: FEED_ORDERS_ITEM_REQUEST })

    try {
      const { success, orders } = await getOrderByNumber(number)
      if (!success) {
        throw new Error(
          'Не удалось получить информацию по переданному номеру заказа.'
        )
      }
      const status = orders[0].status === 'done' ? 'Выполнен' : 'Готовится'
      const statusClass = orders[0].status === 'done' ? 'font-ready' : ''
      dispatch({
        type: FEED_ORDERS_ITEM_SUCCESS,
        payload: {
          ...orders[0],
          status,
          statusClass
        }
      })
    } catch (error) {
      dispatch({ type: FEED_ORDERS_ITEM_FAILED })
      console.error(error)
    }
  }
