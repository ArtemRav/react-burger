import { postData } from '../../utils/burger-api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

export const getOrder = data => async dispatch => {
  dispatch({ type: GET_ORDER_REQUEST })

  const handleError = () => {
    return dispatch({ type: GET_ORDER_FAILED })
  }

  try {
    const {
      order: { number }
    } = await postData('orders', data, handleError)
    dispatch({
      type: GET_ORDER_SUCCESS,
      orderNum: number
    })
  } catch (error) {
    dispatch({ type: GET_ORDER_FAILED })
    console.error(error)
  }
}
