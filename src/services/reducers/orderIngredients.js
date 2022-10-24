import { BUN } from '../../utils/ingredient-types'
import {
  ADD_INGREDIENT_TO_ORDER,
  DEL_INGREDIENT_FROM_ORDER,
  UPDATE_INGREDIENTS_ORDER
} from '../actions/index'

const initialState = {
  items: []
}

export const orderIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_ORDER:
      if (state.items.length && action.item.type === BUN) {
        return {
          ...state,
          items: [
            ...state.items.map(item => {
              if (item.type === BUN) {
                return action.item
              }
              return item
            })
          ]
        }
      }
      return { ...state, items: [...state.items, action.item] }

    case DEL_INGREDIENT_FROM_ORDER:
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.dragId !== action.item.dragId)
        ]
      }

    case UPDATE_INGREDIENTS_ORDER:
      return {
        ...state,
        items: [...action.listItems]
      }

    default:
      return state
  }
}
