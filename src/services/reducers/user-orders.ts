import {
  TFeedConnection,
  USER_CONNECTION_ERROR,
  USER_GET_MESSAGE,
  USER_CONNECTION_SUCCESS,
  USER_CONNECTION_INIT,
  USER_CONNECTION_CLOSED
} from '../actions/user-orders'
import { TOrdersList } from '../types/data'

const initialState: TOrdersList = {
  isOpen: false,
  isCreated: false,
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
    case USER_CONNECTION_INIT:
      return { ...state, isCreated: true }

    case USER_CONNECTION_SUCCESS:
      return { ...state, isOpen: true, error: undefined }

    case USER_CONNECTION_ERROR:
      return { ...state, isOpen: false, error: action.error }

    case USER_CONNECTION_CLOSED:
      return { ...state, isOpen: false, isCreated: false, orders: [] }

    case USER_GET_MESSAGE:
      const { total, totalToday, orders } = JSON.parse(action.payload)
      return {
        ...state,
        total,
        totalToday,
        orders: [...state.orders, ...orders].sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
      }

    default:
      return state
  }
}
