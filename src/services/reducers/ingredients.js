import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
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
      return { ...state, ingredientsFailed: true }
    default:
      return state
  }
}
