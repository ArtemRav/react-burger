import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../types'

export const socketMiddleware = (
  wsUrl: string,
  wsActions: { [key: string]: any }
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null
    let isConnected: boolean = false
    let reconnectTimer: number = 0

    return next => action => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, onOpen, wsClose, onError, onClosed, onMessage } =
        wsActions

      if (type === wsInit && payload) {
        socket = new WebSocket(`${wsUrl}${payload}`)
        isConnected = true
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onerror = error => {
          dispatch({ type: onError, error: error })
        }

        socket.onmessage = event => {
          const { data } = event
          dispatch({ type: onMessage, payload: data })
        }

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch({ type: onError, error: event.code.toString() })
          }
          dispatch({ type: onClosed })

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsInit, payload: wsUrl })
            }, 3000)
          }
        }

        if (type === wsClose) {
          socket.close()
          clearTimeout(reconnectTimer)
          isConnected = false
        }
      }

      next(action)
    }
  }) as Middleware
}
