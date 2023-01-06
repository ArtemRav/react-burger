import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
  getOrder,
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

describe('ORDER thunks', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Should successfully complete getOrder', async () => {
    // Arrange
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        order: {
          number: 42
        }
      }),
      ok: true
    })

    const middllewares = [thunk]
    const mockStore = configureMockStore(middllewares)
    const expectedActions = [
      { type: GET_ORDER_REQUEST },
      {
        type: GET_ORDER_SUCCESS,
        orderNum: 42
      }
    ]
    const store = mockStore({
      number: 0,
      orderRequest: false,
      orderFailed: false
    })

    // Act
    await store.dispatch(getOrder(['id_1', 'id_2']))
    const evaluatedActions = store.getActions()

    // Assert
    expect(evaluatedActions).toEqual(expectedActions)
  })

  test('Should unsuccessfully complete getOrder', async () => {
    // Arrange
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: false,
        message: 'Fetch error'
      }),
      ok: false,
      status: 500
    })

    const middllewares = [thunk]
    const mockStore = configureMockStore(middllewares)
    const expectedActions = [
      { type: GET_ORDER_REQUEST },
      { type: GET_ORDER_FAILED }
    ]
    const store = mockStore({
      number: 0,
      orderRequest: false,
      orderFailed: false
    })

    // Act
    await store.dispatch(getOrder(['id_1', 'id_2']))
    const evaluatedActions = store.getActions()

    // Assert
    expect(evaluatedActions).toEqual(expectedActions)
  })
})
