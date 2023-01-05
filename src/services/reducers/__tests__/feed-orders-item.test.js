import {
  FEED_ORDERS_ITEM_REQUEST,
  FEED_ORDERS_ITEM_SUCCESS,
  FEED_ORDERS_ITEM_FAILED
} from '../../actions/feed-orders-item'
import { feedOrdersItemReducer } from '../feed-orders-item'

const initialState = {
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
const orderGetted = {
  _id: '234523asdf',
  name: 'Космический бургер',
  status: 'ready',
  number: 255,
  date: '',
  ingredients: ['id_2', 'id_3']
}

describe('Redux feed-orders-item test', () => {
  test('Should return the initial state', () => {
    expect(feedOrdersItemReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle request', () => {
    expect(
      feedOrdersItemReducer(undefined, { type: FEED_ORDERS_ITEM_REQUEST })
    ).toEqual({
      ...initialState,
      orderMakedRequest: true,
      orderMakedFailed: false
    })
  })

  test('Should handle success', () => {
    expect(
      feedOrdersItemReducer(
        { ...initialState, orderContent: orderGetted },
        {
          type: FEED_ORDERS_ITEM_SUCCESS,
          payload: orderGetted
        }
      )
    ).toEqual({
      ...initialState,
      orderContent: { ...initialState.orderContent, ...orderGetted },
      orderMakedRequest: false
    })
  })

  test('Should handle error', () => {
    expect(
      feedOrdersItemReducer(undefined, {
        type: FEED_ORDERS_ITEM_FAILED
      })
    ).toEqual({
      ...initialState,
      orderMakedRequest: false,
      orderMakedFailed: true
    })
  })
})
