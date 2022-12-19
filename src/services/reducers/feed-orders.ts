import {
  TFeedConnection,
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_ERROR,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_CLOSED
} from '../actions/feed-orders'
import { TOrdersList } from '../types/data'

const initialState: TOrdersList = {
  wsConnected: false,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined
}

export const feedOrdersReducer = (
  state = initialState,
  action: TFeedConnection
) => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS:
      return { ...state, wsConnected: true, error: undefined }

    case FEED_CONNECTION_ERROR:
      return { ...state, wsConnected: false, error: action.error }

    case FEED_CONNECTION_CLOSE:
      return { ...state, wsConnected: false, error: undefined, orders: [] }

    case FEED_GET_MESSAGE:
      const { success, total, totalToday, orders } = JSON.parse(action.payload)
      return {
        ...state,
        success,
        total,
        totalToday,
        orders: [...state.orders, ...orders]
      }

    case FEED_CONNECTION_CLOSED:
      return { ...state, wsConnected: false, error: undefined }

    default:
      return state
  }
}
