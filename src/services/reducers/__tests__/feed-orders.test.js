import {
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE
} from '../../actions/feed-orders'
import { feedOrdersReducer } from '../feed-orders'

const initialState = {
  isOpen: false,
  isCreated: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
}

describe('Redux user orders test', () => {
  test('Should return the initial state', () => {
    expect(feedOrdersReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle init', () => {
    expect(
      feedOrdersReducer(undefined, { type: FEED_CONNECTION_INIT })
    ).toEqual({
      ...initialState,
      isCreated: true
    })
  })

  test('Should handle success', () => {
    expect(
      feedOrdersReducer(undefined, { type: FEED_CONNECTION_SUCCESS })
    ).toEqual({
      ...initialState,
      isOpen: true,
      error: null
    })
  })

  test('Should handle error', () => {
    expect(
      feedOrdersReducer(undefined, {
        type: FEED_CONNECTION_ERROR,
        error: 'Websocket error'
      })
    ).toEqual({
      ...initialState,
      isOpen: false,
      error: 'Websocket error'
    })
  })

  test('Should handle closed', () => {
    expect(
      feedOrdersReducer(undefined, { type: FEED_CONNECTION_CLOSED })
    ).toEqual({
      ...initialState,
      isOpen: false,
      isCreated: false,
      orders: []
    })
  })

  test('Should handle message', () => {
    const orders = [
      {
        ingredients: ['id_1', 'id_2'],
        _id: '_id',
        status: 'done',
        name: 'Order name',
        number: 1377,
        createdAt: '2022-12-13T15:50:21.895Z',
        updatedAt: '2022-12-13T15:50:21.895Z'
      },
      {
        ingredients: ['id_3', 'id_6', 'id_8'],
        _id: '_id',
        status: 'done',
        name: 'Order name',
        number: 1389,
        createdAt: '2022-12-17T15:50:21.895Z',
        updatedAt: '2022-12-17T15:50:21.895Z'
      }
    ]

    expect(
      feedOrdersReducer(undefined, {
        type: FEED_GET_MESSAGE,
        payload: JSON.stringify({
          total: 2,
          totalToday: 1,
          orders
        })
      })
    ).toEqual({
      ...initialState,
      total: 2,
      totalToday: 1,
      orders
    })
  })
})
