import { v1 as uuidv1 } from 'uuid'
import { AppDispatch } from '../types'
import { BUN, TIngredientItem } from '../types/data'
import {
  DECREASE_QNT_INGREDIENTS,
  DROP_QNT_ALL_BUNS,
  INCREASE_QNT_INGREDIENTS
} from './ingredients'

export const ADD_INGREDIENT_TO_ORDER = 'ADD_INGREDIENT_TO_ORDER'
export const DEL_INGREDIENT_FROM_ORDER = 'DEL_INGREDIENT_FROM_ORDER'
export const UPDATE_INGREDIENTS_ORDER = 'UPDATE_INGREDIENTS_ORDER'

export type TAddIngredientToOrderAction = {
  readonly type: typeof ADD_INGREDIENT_TO_ORDER
  item: TIngredientItem
}

export type TDelIngredientFromOrderAction = {
  readonly type: typeof DEL_INGREDIENT_FROM_ORDER
  item: TIngredientItem
}

export type TUpdateIngredientsOrderAction = {
  readonly type: typeof UPDATE_INGREDIENTS_ORDER
  listItems: Array<TIngredientItem>
}

export type TIngredientDetailsActions =
  | TAddIngredientToOrderAction
  | TDelIngredientFromOrderAction
  | TUpdateIngredientsOrderAction

export const addIngredient =
  (ingredient: TIngredientItem) => (dispatch: AppDispatch) => {
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
  (item: TIngredientItem) => (dispatch: AppDispatch) => {
    dispatch({
      type: DEL_INGREDIENT_FROM_ORDER,
      item
    })
    dispatch({
      type: DECREASE_QNT_INGREDIENTS,
      _id: item._id
    })
  }
