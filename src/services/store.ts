import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { socketMiddleware } from './middleware/socket-middleware'
import { rootReducer } from './reducers'
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE
} from './actions/feed-orders'
import {
  USER_CONNECTION_CLOSE,
  USER_CONNECTION_CLOSED,
  USER_CONNECTION_ERROR,
  USER_CONNECTION_INIT,
  USER_CONNECTION_SUCCESS,
  USER_GET_MESSAGE
} from './actions/user-orders'

const WEBSOCKET_API_URL = 'wss://norma.nomoreparties.space/orders'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const feedWsActions = {
  wsInit: FEED_CONNECTION_INIT,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSE,
  onError: FEED_CONNECTION_ERROR,
  onClosed: FEED_CONNECTION_CLOSED,
  onMessage: FEED_GET_MESSAGE
}

const userWsActions = {
  wsInit: USER_CONNECTION_INIT,
  onOpen: USER_CONNECTION_SUCCESS,
  onClose: USER_CONNECTION_CLOSE,
  onError: USER_CONNECTION_ERROR,
  onClosed: USER_CONNECTION_CLOSED,
  onMessage: USER_GET_MESSAGE
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    socketMiddleware(WEBSOCKET_API_URL, feedWsActions),
    socketMiddleware(WEBSOCKET_API_URL, userWsActions)
  )
)

export const store = createStore(rootReducer, enhancer)
