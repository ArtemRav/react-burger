import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../types'

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => action => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions

      if (type === wsInit) {
        socket = new WebSocket(wsUrl)
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = event => {
          const { data } = event
          dispatch({ type: onMessage, payload: data })
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
        }

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message))
        }
      }

      next(action)
    }
  }) as Middleware
}
