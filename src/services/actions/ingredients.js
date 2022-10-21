import { getData } from '../../utils/burger-api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const fetchIngredients = () => async dispatch => {
  dispatch({ type: GET_INGREDIENTS_REQUEST })
  try {
    const { data } = await getData('ingredients')
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      data
    })
  } catch (error) {
    dispatch({ type: GET_INGREDIENTS_FAILED })
    console.error(error)
  }
}
