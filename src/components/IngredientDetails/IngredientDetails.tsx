import detailsCss from './Ingredient-details.module.css'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { TState } from '../../services/reducers'
import { TIngredientItem } from '../../services/types/data'

export const IngredientDetails = () => {
  const params = useParams<{ ingredientId: string }>()

  const ingredientsList = useSelector(
    (state: TState) => state.allIngredients.ingredientsList
  )

  const ingredient = useMemo<TIngredientItem | any>(
    () =>
      ingredientsList.find(
        (item: TIngredientItem) => item._id === params.ingredientId
      ),
    [ingredientsList, params.ingredientId]
  )

  return (
    ingredient && (
      <div className={`${detailsCss.wrapper} pb-15`}>
        <img
          className={detailsCss.img}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <h2 className={`${detailsCss.title} text text_type_main-medium`}>
          {ingredient.name}
        </h2>
        <ul className={`${detailsCss.compound} mt-8`}>
          <li className={`${detailsCss.item} text_color_inactive`}>
            <span className="text text_type_main-small text_color_inactive">
              Калории, ккал
            </span>
            <span className="text text_type_digits-default">
              {ingredient.calories}
            </span>
          </li>
          <li className={`${detailsCss.item} text_color_inactive`}>
            <span className="text text_type_main-small text_color_inactive">
              Белки, г
            </span>
            <span className="text text_type_digits-default">
              {ingredient.proteins}
            </span>
          </li>
          <li className={`${detailsCss.item} text_color_inactive`}>
            <span className="text text_type_main-small text_color_inactive">
              Жиры, г
            </span>
            <span className="text text_type_digits-default">
              {ingredient.fat}
            </span>
          </li>
          <li className={`${detailsCss.item} text_color_inactive`}>
            <span className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </span>
            <span className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    )
  )
}
