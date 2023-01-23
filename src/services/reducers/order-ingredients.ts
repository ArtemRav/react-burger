import {
  ADD_INGREDIENT_TO_ORDER,
  DEL_INGREDIENT_FROM_ORDER,
  UPDATE_INGREDIENTS_ORDER,
  TIngredientDetailsActions
} from '../actions/index'
import { BUN, TOrderIngredient } from '../types/data'

const initialState: TOrderIngredient = {
  items: []
}

export const orderIngredientsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_ORDER:
      return { ...state, items: [...state.items, action.item] }

    case DEL_INGREDIENT_FROM_ORDER:
      return {
        ...state,
        items:
          action.item.type === BUN
            ? [...state.items.filter(item => item.type !== BUN)]
            : [
                ...state.items.filter(
                  item => item.dragId !== action.item.dragId
                )
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
