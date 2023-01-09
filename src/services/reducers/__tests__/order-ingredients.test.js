import {
  ADD_INGREDIENT_TO_ORDER,
  DEL_INGREDIENT_FROM_ORDER,
  UPDATE_INGREDIENTS_ORDER
} from '../../actions'
import { orderIngredientsReducer } from '../order-ingredients'
import { data } from '../../../utils/data'
import { BUN } from '../../types/data'

const initialState = {
  items: []
}

const initialItems = [
  {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i (fake)',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    qnt: 1,
    dragId: 111
  },
  {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    qnt: 1,
    dragId: 222
  }
]

describe('Redux order-ingredients test', () => {
  test('Should return the initial state', () => {
    expect(orderIngredientsReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle add ingredient to order', () => {
    const orderItem = { ...data[0] }

    expect(
      orderIngredientsReducer(undefined, {
        type: ADD_INGREDIENT_TO_ORDER,
        item: orderItem
      })
    ).toEqual({
      ...initialState,
      items: initialState.items.find(item => item.type === BUN)
        ? [
            ...initialState.items.map(item => {
              if (item.type === BUN) {
                return orderItem
              }
              return item
            })
          ]
        : [...initialState.items, orderItem]
    })
  })

  test('Should handle del ingredient from order', () => {
    const itemDeleted = initialItems[1]
    expect(
      orderIngredientsReducer(
        {
          ...initialState,
          items: initialItems.filter(item => item.dragId !== itemDeleted.dragId)
        },
        {
          type: DEL_INGREDIENT_FROM_ORDER,
          item: itemDeleted
        }
      )
    ).toEqual({
      ...initialState,
      items: initialItems.filter(item => item.dragId !== itemDeleted.dragId)
    })
  })

  test('Should handle update ingredients', () => {
    expect(
      orderIngredientsReducer(undefined, {
        type: UPDATE_INGREDIENTS_ORDER,
        listItems: initialItems
      })
    ).toEqual({
      ...initialState,
      items: initialItems
    })
  })
})
