import detailsCss from './Ingredient-details.module.css'
import PropTypes from 'prop-types'

export const IngredientDetails = props => {
  const { name, calories, proteins, fat, carbohydrates, image } = props

  return (
    <div className={`${detailsCss.wrapper} pb-15`}>
      <img className={detailsCss.img} src={image} alt={name} />
      <h2 className={`${detailsCss.title} text text_type_main-medium`}>
        {name}
      </h2>
      <ul className={`${detailsCss.compound} mt-8`}>
        <li className={`${detailsCss.item} text_color_inactive`}>
          <span className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_digits-default">{calories}</span>
        </li>
        <li className={`${detailsCss.item} text_color_inactive`}>
          <span className="text text_type_main-small text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default">{proteins}</span>
        </li>
        <li className={`${detailsCss.item} text_color_inactive`}>
          <span className="text text_type_main-small text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default">{fat}</span>
        </li>
        <li className={`${detailsCss.item} text_color_inactive`}>
          <span className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default">{carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}
