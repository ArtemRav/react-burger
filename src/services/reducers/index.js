import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { currentIngredientReducer } from './currentIngredient'
import { orderReducer } from './order'
import { orderIngredientsReducer } from './orderIngredients'

export const rootReducer = combineReducers({
  curOrder: orderReducer,
  curIngredient: currentIngredientReducer,
  allIngredients: ingredientsReducer,
  orderIngredients: orderIngredientsReducer
})
