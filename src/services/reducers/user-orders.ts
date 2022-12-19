import {
  TFeedConnection,
  USER_CONNECTION_CLOSE,
  USER_CONNECTION_ERROR,
  USER_GET_MESSAGE,
  USER_CONNECTION_SUCCESS
} from '../actions/user-orders'
import { TOrdersList } from '../types/data'

const initialState: TOrdersList = {
  wsConnected: false,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined
}

export const userOrdersReducer = (
  state = initialState,
  action: TFeedConnection
) => {
  switch (action.type) {
    case USER_CONNECTION_SUCCESS:
      return { ...state, wsConnected: true, error: undefined }

    case USER_CONNECTION_ERROR:
      return { ...state, wsConnected: false, error: action.error }

    case USER_CONNECTION_CLOSE:
      return { ...state, wsConnected: false, error: undefined, orders: [] }

    case USER_GET_MESSAGE:
      const { success, total, totalToday, orders } = JSON.parse(action.payload)
      return {
        ...state,
        success,
        total,
        totalToday,
        orders: [...state.orders, ...orders]
      }

    default:
      return state
  }
}
