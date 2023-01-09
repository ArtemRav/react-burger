import {
  FEED_ORDERS_ITEM_REQUEST,
  FEED_ORDERS_ITEM_SUCCESS,
  FEED_ORDERS_ITEM_FAILED,
  TFeedOrdersItem
} from '../actions/feed-orders-item'
import { TOrdersItem } from '../types/data'

const initialState: TOrdersItem = {
  orderContent: {
    _id: '',
    name: '',
    status: '',
    number: 0,
    date: '',
    ingredients: []
  },
  orderMakedRequest: false,
  orderMakedFailed: false
}

export const feedOrdersItemReducer = (
  state = initialState,
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
      return { ...state, orderMakedRequest: false, orderMakedFailed: true }

    default:
      return state
  }
}
