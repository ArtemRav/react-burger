import { combineReducers } from 'redux'
import { userReducer } from './user'
import { orderReducer } from './order'
import { ingredientsReducer } from './ingredients'
import { orderIngredientsReducer } from './order-ingredients'
import { recoverPasswordReducer } from './recover-password'
import { resetPasswordReducer } from './reset-password'
import { orderMakedReducer } from './order-maked'
import { feedOrdersReducer } from './feed-orders'
import { userOrdersReducer } from './user-orders'

export const rootReducer = combineReducers({
  user: userReducer,
  curOrder: orderReducer,
  orderMaked: orderMakedReducer,
  feedOrders: feedOrdersReducer,
  userOrders: userOrdersReducer,
  resetPassword: resetPasswordReducer,
  allIngredients: ingredientsReducer,
  recoverPassword: recoverPasswordReducer,
  orderIngredients: orderIngredientsReducer
})

export type TState = ReturnType<typeof rootReducer>
