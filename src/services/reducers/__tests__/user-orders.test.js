import {
  USER_CONNECTION_CLOSED,
  USER_CONNECTION_ERROR,
  USER_CONNECTION_INIT,
  USER_CONNECTION_SUCCESS,
  USER_GET_MESSAGE
} from '../../actions/user-orders'
import { userOrdersReducer } from '../user-orders'

const initialState = {
  isOpen: false,
  isCreated: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined
}

describe('Redux user orders test', () => {
  test('Should return the initial state', () => {
    expect(userOrdersReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle init', () => {
    expect(
      userOrdersReducer(undefined, { type: USER_CONNECTION_INIT })
    ).toEqual({
      ...initialState,
      isCreated: true
    })
  })

  test('Should handle success', () => {
    expect(
      userOrdersReducer(undefined, { type: USER_CONNECTION_SUCCESS })
    ).toEqual({
      ...initialState,
      isOpen: true,
      error: undefined
    })
  })

  test('Should handle error', () => {
    expect(
      userOrdersReducer(undefined, {
        type: USER_CONNECTION_ERROR,
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
      userOrdersReducer(undefined, { type: USER_CONNECTION_CLOSED })
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
      userOrdersReducer(undefined, {
        type: USER_GET_MESSAGE,
        payload: JSON.stringify({
          total: 2,
          totalToday: 1,
          orders: orders
        })
      })
    ).toEqual({
      ...initialState,
      total: 2,
      totalToday: 1,
      orders: orders.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      )
    })
  })
})
