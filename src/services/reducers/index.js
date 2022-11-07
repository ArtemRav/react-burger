import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { currentIngredientReducer } from './currentIngredient'
import { orderReducer } from './order'
import { orderIngredientsReducer } from './orderIngredients'
import { userReducer } from './user'
import { recoverPasswordReducer } from './recover-password'
import { resetPasswordReducer } from './reset-password'

export const rootReducer = combineReducers({
  curOrder: orderReducer,
  curIngredient: currentIngredientReducer,
  allIngredients: ingredientsReducer,
  orderIngredients: orderIngredientsReducer,
  user: userReducer,
  recoverPassword: recoverPasswordReducer,
  resetPassword: resetPasswordReducer
})
