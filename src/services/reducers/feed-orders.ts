import {
  TFeedConnection,
  FEED_CONNECTION_ERROR,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_INIT
} from '../actions/feed-orders'
import { TOrdersList } from '../types/data'

const initialState: TOrdersList = {
  orders: [],
  isCreated: false,
  isOpen: false,
  total: 0,
  totalToday: 0,
  error: null
}

export const feedOrdersReducer = (
  state = initialState,
  action: TFeedConnection
) => {
  switch (action.type) {
    case FEED_CONNECTION_INIT:
      return { ...state, isCreated: true }

    case FEED_CONNECTION_SUCCESS:
      return { ...state, isOpen: true, error: null }

    case FEED_CONNECTION_ERROR:
      return { ...state, error: action.error }

    case FEED_GET_MESSAGE:
      const { total, totalToday, orders } = JSON.parse(action.payload)
      return {
        ...state,
        total,
        totalToday,
        orders: [...state.orders, ...orders]
      }

    case FEED_CONNECTION_CLOSED:
      return { ...state, isOpen: false, isCreated: false, orders: [] }

    default:
      return state
  }
}
