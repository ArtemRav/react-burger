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
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event })
        }

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
        }

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event
          dispatch({ type: onMessage, payload: data })
        }
        // функция, которая вызывается при закрытии соединения
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
