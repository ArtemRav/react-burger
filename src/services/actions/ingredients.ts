import { getData } from '../../utils/burger-api'
import { AppDispatch } from '../types'
import { TIngredientItem } from '../types/data'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const DROP_QNT_ALL_BUNS = 'DROP_QNT_ALL_BUNS'
export const INCREASE_QNT_INGREDIENTS = 'INCREASE_QNT_INGREDIENTS'
export const DECREASE_QNT_INGREDIENTS = 'DECREASE_QNT_INGREDIENTS'

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly data: Array<TIngredientItem>
}

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export type DropQntAllBunsAction = {
  readonly type: typeof DROP_QNT_ALL_BUNS
}

export type TIncreaseQntIngredientsAction = {
  readonly type: typeof INCREASE_QNT_INGREDIENTS
  _id?: string
}

export type TDecreaseQntIngredientsAction = {
  readonly type: typeof DECREASE_QNT_INGREDIENTS
  _id?: string
}

export type TIngredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction
  | DropQntAllBunsAction
  | TIncreaseQntIngredientsAction
  | TDecreaseQntIngredientsAction

export const fetchIngredients: any = () => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST })

  try {
    const { data } = await getData('ingredients')
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      data: data.map((ingredient: TIngredientItem) => ({
        ...ingredient,
        qnt: 0
      }))
    })
  } catch (error) {
    dispatch({ type: GET_INGREDIENTS_FAILED })
    console.error(error)
  }
}
