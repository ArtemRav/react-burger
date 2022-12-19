export const FEED_CONNECTION_INIT = 'FEED_CONNECTION_INIT'
export const FEED_CONNECTION_SUCCESS = 'FEED_CONNECTION_SUCCESS'
export const FEED_CONNECTION_CLOSED = 'FEED_CONNECTION_CLOSED'
export const FEED_CONNECTION_ERROR = 'FEED_CONNECTION_ERROR'
export const FEED_CONNECTION_CLOSE = 'FEED_CONNECTION_CLOSE'
export const FEED_GET_MESSAGE = 'FEED_GET_MESSAGE'

export type TFeedConnectionInit = {
  readonly type: typeof FEED_CONNECTION_INIT
  wsUrl: string
}

export type TFeedConnectionSuccess = {
  readonly type: typeof FEED_CONNECTION_SUCCESS
}

export type TFeedConnectionClosed = {
  readonly type: typeof FEED_CONNECTION_CLOSED
}

export type TFeedConnectionError = {
  readonly type: typeof FEED_CONNECTION_ERROR
  error: string
}

export type TFeedConnectionClose = {
  readonly type: typeof FEED_CONNECTION_CLOSE
}

export type TFeedGetMessage = {
  readonly type: typeof FEED_GET_MESSAGE
  payload: string
}

export type TFeedConnection =
  | TFeedConnectionInit
  | TFeedConnectionSuccess
  | TFeedConnectionClosed
  | TFeedConnectionError
  | TFeedConnectionClose
  | TFeedGetMessage
