import {
  TWebSocketActions,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS
} from '../actions/orders'

const initialState = {
  socket: null
}

const wsUrl = ''

export const ordersReducer = (
  state = initialState,
  action: TWebSocketActions
) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return { ...state, socket: new WebSocket(wsUrl) }

    case WS_CONNECTION_SUCCESS:
      return { ...state }
  }
}
