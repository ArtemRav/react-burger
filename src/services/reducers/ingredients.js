import { BUN } from '../../utils/ingredient-types'
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_QNT_INGREDIENTS,
  DECREASE_QNT_INGREDIENTS,
  DROP_QNT_ALL_BUNS
} from '../actions/ingredients'

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: []
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true }

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsList: action.data,
        ingredientsRequest: false
      }

    case GET_INGREDIENTS_FAILED:
      return { ...state, ingredientsFailed: true, ingredientsRequest: false }

    case INCREASE_QNT_INGREDIENTS:
      return {
        ...state,
        ingredientsList: [
          ...state.ingredientsList.map(item => {
            if (item._id === action._id) {
              item.qnt = item.type === BUN ? 2 : ++item.qnt
            }
            return item
          })
        ]
      }

    case DECREASE_QNT_INGREDIENTS:
      return {
        ...state,
        ingredientsList: [
          ...state.ingredientsList.map(item => {
            if (item._id === action._id) {
              item.qnt -= 1
            }
            return item
          })
        ]
      }

    case DROP_QNT_ALL_BUNS:
      return {
        ...state,
        ingredientsList: [
          ...state.ingredientsList.map(item => {
            if (item.type === BUN) {
              item.qnt = 0
            }
            return item
          })
        ]
      }

    default:
      return state
  }
}
