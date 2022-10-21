import { postData } from '../../utils/burger-api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

export const getOrder = data => async dispatch => {
  dispatch({ type: GET_ORDER_REQUEST })
  try {
    const {
      order: { number }
    } = await postData('orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    dispatch({
      type: GET_ORDER_SUCCESS,
      orderNum: number
    })
  } catch (error) {
    dispatch({ type: GET_ORDER_FAILED })
    console.error(error)
  }
}
