import {
  CLEAR_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT
} from '../actions/index'

const initialState = {}

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ...state, ...action.item }
    case CLEAR_CURRENT_INGREDIENT:
      return {}
    default:
      return state
  }
}
