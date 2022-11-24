import { Dispatch } from 'react'
import { getData } from '../../utils/burger-api'
import { TIngredientItem } from '../../utils/ingredient-types'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const DROP_QNT_ALL_BUNS = 'DROP_QNT_ALL_BUNS'
export const INCREASE_QNT_INGREDIENTS = 'INCREASE_QNT_INGREDIENTS'
export const DECREASE_QNT_INGREDIENTS = 'DECREASE_QNT_INGREDIENTS'

type TFetchIngredients = {
  type:
    | typeof GET_INGREDIENTS_REQUEST
    | typeof GET_INGREDIENTS_SUCCESS
    | typeof GET_INGREDIENTS_FAILED
  data?: any
}

export const fetchIngredients =
  () => async (dispatch: Dispatch<TFetchIngredients>) => {
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
