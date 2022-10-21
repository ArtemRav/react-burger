import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order'

const initialState = {
  number: 0,
  titleId: 'идентификатор заказа',
  titleState: 'Ваш заказ начали готовить',
  titleInfo: 'Дождитесь готовности на орбитальной станции',
  titleOrderFailed: 'Заказ не создан',
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, orderRequest: true }
    case GET_ORDER_SUCCESS:
      return { ...state, number: action.orderNum, orderRequest: false }
    case GET_ORDER_FAILED:
      return { ...state, orderFailed: true, orderRequest: false }
    default:
      return state
  }
}
