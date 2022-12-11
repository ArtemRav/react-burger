import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { orderReducer } from './order'
import { orderIngredientsReducer } from './order-ingredients'
import { userReducer } from './user'
import { recoverPasswordReducer } from './recover-password'
import { resetPasswordReducer } from './reset-password'
import { ordersListReducer } from './orders-list'
import { orderMakedReducer } from './order-maked'

export const rootReducer = combineReducers({
  user: userReducer,
  curOrder: orderReducer,
  orderMaked: orderMakedReducer,
  ordersList: ordersListReducer,
  resetPassword: resetPasswordReducer,
  allIngredients: ingredientsReducer,
  recoverPassword: recoverPasswordReducer,
  orderIngredients: orderIngredientsReducer
})

export type TState = ReturnType<typeof rootReducer>
