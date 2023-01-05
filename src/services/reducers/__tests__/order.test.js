import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS
} from '../../actions/order'
import { orderReducer } from '../order'

const initialState = {
  number: 0,
  titleId: 'идентификатор заказа',
  titleState: 'Ваш заказ начали готовить',
  titleInfo: 'Дождитесь готовности на орбитальной станции',
  titleOrderFailed: 'Заказ не создан',
  orderRequest: false,
  orderFailed: false
}

describe('Redux order test', () => {
  test('Should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle request', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_REQUEST })).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false
    })
  })

  test('Should handle success', () => {
    expect(
      orderReducer(undefined, { type: GET_ORDER_SUCCESS, orderNum: 1288 })
    ).toEqual({
      ...initialState,
      number: 1288,
      orderRequest: false
    })
  })

  test('Should handle failed', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_FAILED })).toEqual({
      ...initialState,
      orderFailed: true,
      orderRequest: false
    })
  })
})
