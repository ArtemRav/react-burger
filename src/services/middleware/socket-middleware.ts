import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../types'

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => action => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions

      if (type === wsInit && payload) {
        socket = new WebSocket(`${wsUrl}${payload}`)
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

        if (type === onClose) {
          socket.close()
        }
      }

      next(action)
    }
  }) as Middleware
}
