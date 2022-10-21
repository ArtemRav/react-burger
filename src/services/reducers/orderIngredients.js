import {
  ADD_INGREDIENT_TO_ORDER,
  DEL_INGREDIENT_FROM_ORDER
} from '../actions/index'

const initialState = {
  items: []
}

export const orderIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_ORDER:
      return { ...state, items: [...state.items, action.item] }
    case DEL_INGREDIENT_FROM_ORDER:
      return {
        ...state,
        items: [...state.items.filter(item => item._id !== action.item._id)]
      }
    default:
      return state
  }
}
