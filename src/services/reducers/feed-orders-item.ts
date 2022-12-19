import {
  FEED_ORDERS_ITEM_REQUEST,
  FEED_ORDERS_ITEM_SUCCESS,
  FEED_ORDERS_ITEM_FAILED,
  TFeedOrdersItem
} from '../actions/feed-orders-item'

const initialState = {
  orderContent: {},
  orderMakedRequest: false,
  orderMakedFailed: false
}

export const feedOrdersItemReducer = (
  state: any = initialState,
  action: TFeedOrdersItem
) => {
  switch (action.type) {
    case FEED_ORDERS_ITEM_REQUEST:
      return { ...state, orderMakedRequest: true, orderMakedFailed: false }

    case FEED_ORDERS_ITEM_SUCCESS:
      return {
        ...state,
        orderContent: action.payload,
        orderMakedRequest: false
      }

    case FEED_ORDERS_ITEM_FAILED:
      return { ...state, orderMakedFailed: true, orderMakedRequest: false }

    default:
      return state
  }
}
