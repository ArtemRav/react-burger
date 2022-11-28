import { Dispatch } from 'react'
import { v1 as uuidv1 } from 'uuid'
import { BUN, TIngredientItem } from '../../utils/ingredient-types'
import {
  DECREASE_QNT_INGREDIENTS,
  DROP_QNT_ALL_BUNS,
  INCREASE_QNT_INGREDIENTS
} from './ingredients'
export const ADD_INGREDIENT_TO_ORDER = 'ADD_INGREDIENT_TO_ORDER'
export const DEL_INGREDIENT_FROM_ORDER = 'DEL_INGREDIENT_FROM_ORDER'
export const UPDATE_INGREDIENTS_ORDER = 'UPDATE_INGREDIENTS_ORDER'

type TAddIngredient = {
  type:
    | typeof ADD_INGREDIENT_TO_ORDER
    | typeof INCREASE_QNT_INGREDIENTS
    | typeof DEL_INGREDIENT_FROM_ORDER
    | typeof DROP_QNT_ALL_BUNS
  item?: any
  _id?: string
}

type TDelIngredient = {
  type: typeof DEL_INGREDIENT_FROM_ORDER | typeof DECREASE_QNT_INGREDIENTS
  item?: any
  _id?: string
}

export const addIngredient =
  (ingredient: TIngredientItem) => (dispatch: Dispatch<TAddIngredient>) => {
    dispatch({
      type: ADD_INGREDIENT_TO_ORDER,
      item: {
        ...ingredient,
        dragId: uuidv1()
      }
    })

    if (ingredient.type === BUN) {
      dispatch({
        type: DROP_QNT_ALL_BUNS
      })
    }

    dispatch({
      type: INCREASE_QNT_INGREDIENTS,
      _id: ingredient._id
    })
  }

export const delIngredient =
  (item: TIngredientItem) => (dispatch: Dispatch<TDelIngredient>) => {
    dispatch({
      type: DEL_INGREDIENT_FROM_ORDER,
      item
    })
    dispatch({
      type: DECREASE_QNT_INGREDIENTS,
      _id: item._id
    })
  }
