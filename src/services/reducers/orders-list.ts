import {
  TWebSocketActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_MESSAGE,
  WS_CONNECTION_SUCCESS
} from '../actions/orders-list'
import { THistoryOrders } from '../types/data'

const initialState: THistoryOrders = {
  wsConnected: false,
  error: undefined,
  ordersList: [],
  total: 0,
  totalToday: 0
}

export const ordersListReducer = (
  state = initialState,
  action: TWebSocketActions
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return { ...state, wsConnected: true, error: undefined }

    case WS_CONNECTION_ERROR:
      return { ...state, wsConnected: false, error: action.error }

    case WS_CONNECTION_CLOSED:
      return { ...state, wsConnected: false, error: undefined }

    case WS_CONNECTION_MESSAGE:
      return { ...state, ordersList: [...state.ordersList, action.orders] }

    default:
      return state
  }
}
