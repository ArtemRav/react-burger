/* eslint-disable jest/valid-expect */
import {
  DROP_QNT_ALL_BUNS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_QNT_INGREDIENTS
} from '../../actions/ingredients'
import { BUN, MAIN, SAUCE } from '../../types/data'
import { ingredientsReducer } from '../ingredients'
import { data } from '../../../utils/data'

describe('Redux get ingredients', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockRejectedValue({
      json: jest.fn().mockResolvedValue({ result: 'OK' }),
      ok: true
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsList: [],
    ingredientTabs: [
      { id: BUN, name: 'Булки' },
      { id: SAUCE, name: 'Соусы' },
      { id: MAIN, name: 'Начинки' }
    ]
  }

  test('Should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle request', () => {
    expect(
      ingredientsReducer(undefined, { type: GET_INGREDIENTS_REQUEST })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true
    })
  })

  test('Should handle success', () => {
    expect(
      ingredientsReducer(undefined, { type: GET_INGREDIENTS_SUCCESS, data })
    ).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsList: data
    })
  })

  test('Should handle error', () => {
    expect(
      ingredientsReducer(undefined, { type: GET_INGREDIENTS_FAILED })
    ).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false
    })
  })

  test('Should increase qnt ingredients', () => {
    const _id = '60d3b41abdacab0026a733c6'
    expect(
      ingredientsReducer(
        { ...initialState, ingredientsList: data },
        { type: INCREASE_QNT_INGREDIENTS, _id }
      )
    ).toEqual({
      ...initialState,
      ingredientsList: data.map(item => {
        if (item._id === _id) {
          const qnt = item.type === BUN ? 2 : ++item.qnt
          return { ...item, qnt }
        }
        return item
      })
    })
  })

  test('Should decrease qnt ingredients', () => {
    const _id = '60d3b41abdacab0026a733c6'
    expect(
      ingredientsReducer(
        { ...initialState, ingredientsList: data },
        { type: INCREASE_QNT_INGREDIENTS, _id }
      )
    ).toEqual({
      ...initialState,
      ingredientsList: data.map(item => {
        if (item._id === _id) {
          const qnt = --item.qnt
          return { ...item, qnt }
        }
        return item
      })
    })
  })

  test('Should drop buns', () => {
    expect(
      ingredientsReducer(
        { ...initialState, ingredientsList: data },
        { type: DROP_QNT_ALL_BUNS }
      )
    ).toEqual({
      ...initialState,
      ingredientsList: data.map(item => {
        if (item.type === BUN) {
          item.qnt = 0
        }
        return item
      })
    })
  })
})
