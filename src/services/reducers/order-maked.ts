import {
  GET_ORDER_MAKED_REQUEST,
  GET_ORDER_MAKED_SUCCESS,
  GET_ORDER_MAKED_FAILED,
  TOrderMakedActions
} from '../actions/order-maked'

const initialState = {
  orderContent: {},
  orderMakedRequest: false,
  orderMakedFailed: false
}

export const orderMakedReducer = (
  state: any = initialState,
  action: TOrderMakedActions
) => {
  switch (action.type) {
    case GET_ORDER_MAKED_REQUEST:
      return { ...state, orderMakedRequest: true, orderMakedFailed: false }
    case GET_ORDER_MAKED_SUCCESS:
      return {
        ...state,
        orderContent: action.payload,
        orderMakedRequest: false
      }
    case GET_ORDER_MAKED_FAILED:
      return { ...state, orderMakedFailed: true, orderMakedRequest: false }
    default:
      return state
  }
}
