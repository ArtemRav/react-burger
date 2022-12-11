import { THistoryOrderItem } from '../types/data'

export const WS_CONNECTION_START = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_MESSAGE = 'WS_CONNECTION_MESSAGE'
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'

export type TWsConnectionStartAction = {
  readonly type: typeof WS_CONNECTION_START
}

export type TWsConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export type TWsConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR
  error: string
}

export type TWsConnectionMessageAction = {
  readonly type: typeof WS_CONNECTION_MESSAGE
  orders: Array<THistoryOrderItem>
}

export type TWsConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export type TWebSocketActions =
  | TWsConnectionStartAction
  | TWsConnectionSuccessAction
  | TWsConnectionErrorAction
  | TWsConnectionMessageAction
  | TWsConnectionClosedAction
