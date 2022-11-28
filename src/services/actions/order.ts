import { Dispatch } from 'react'
import { postData } from '../../utils/burger-api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

type TFetchIngredients = {
  type:
    | typeof GET_ORDER_REQUEST
    | typeof GET_ORDER_SUCCESS
    | typeof GET_ORDER_FAILED
  data?: any
  orderNum?: number
}

export const getOrder =
  (data: any) => async (dispatch: Dispatch<TFetchIngredients>) => {
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
