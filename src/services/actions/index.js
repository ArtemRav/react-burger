import { v1 as uuidv1 } from 'uuid'
import {
  DECREASE_QNT_INGREDIENTS,
  DROP_QNT_ALL_BUNS,
  INCREASE_QNT_INGREDIENTS
} from './ingredients'
export const ADD_INGREDIENT_TO_ORDER = 'ADD_INGREDIENT_TO_ORDER'
export const DEL_INGREDIENT_FROM_ORDER = 'DEL_INGREDIENT_FROM_ORDER'

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT'

export const addIngredient = ingredient => dispatch => {
  dispatch({
    type: ADD_INGREDIENT_TO_ORDER,
    item: {
      ...ingredient,
      dragId: uuidv1()
    }
  })

  if (ingredient.type === 'bun') {
    dispatch({
      type: DROP_QNT_ALL_BUNS
    })
  }

  dispatch({
    type: INCREASE_QNT_INGREDIENTS,
    _id: ingredient._id
  })
}

export const delIngredient = item => dispatch => {
  dispatch({
    type: DEL_INGREDIENT_FROM_ORDER,
    item
  })
  dispatch({
    type: DECREASE_QNT_INGREDIENTS,
    _id: item._id
  })
}
