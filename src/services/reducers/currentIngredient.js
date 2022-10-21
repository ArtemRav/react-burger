import { SET_CURRENT_INGREDIENT } from '../actions/index'

const initialState = {
  item: {}
}

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ...state, item: { ...state.item, ...action.item } }
    default:
      return state
  }
}
