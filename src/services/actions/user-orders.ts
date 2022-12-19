export const USER_CONNECTION_INIT = 'USER_CONNECTION_INIT'
export const USER_CONNECTION_SUCCESS = 'USER_CONNECTION_SUCCESS'
export const USER_CONNECTION_CLOSE = 'USER_CONNECTION_CLOSE'
export const USER_CONNECTION_ERROR = 'USER_CONNECTION_ERROR'
export const USER_CONNECTION_CLOSED = 'USER_CONNECTION_CLOSED'
export const USER_GET_MESSAGE = 'USER_GET_MESSAGE'

export type TUserConnectionInit = {
  readonly type: typeof USER_CONNECTION_INIT
  wsUrl: string
}

export type TUserConnectionSuccess = {
  readonly type: typeof USER_CONNECTION_SUCCESS
}

export type TUserConnectionClose = {
  readonly type: typeof USER_CONNECTION_CLOSE
}

export type TUserConnectionError = {
  readonly type: typeof USER_CONNECTION_ERROR
  error: string
}

export type TUserConnectionClosed = {
  readonly type: typeof USER_CONNECTION_CLOSED
}

export type TUserGetMessage = {
  readonly type: typeof USER_GET_MESSAGE
  payload: string
}

export type TFeedConnection =
  | TUserConnectionInit
  | TUserConnectionSuccess
  | TUserConnectionClose
  | TUserConnectionError
  | TUserConnectionClosed
  | TUserGetMessage
