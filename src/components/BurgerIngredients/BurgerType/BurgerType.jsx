import { BurgerItem } from '../Burgeritem/BurgerItem'
import burgerType from './burger-type.module.css'
import PropTypes from 'prop-types'
import { burgerListItemPropTypes } from '../../../utils/prop-types'

export const BurgerType = ({ title, list, id }) => {
  return (
    <div id={id}>
      <h2 className={burgerType.title}>{title}</h2>
      <ul className={`pt-6 pb-10 pl-4 ${burgerType.items}`}>
        {list.map(item => (
          <BurgerItem ingredient={item} key={item._id} />
        ))}
      </ul>
    </div>
  )
}

BurgerType.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(burgerListItemPropTypes()).isRequired,
  id: PropTypes.string.isRequired
}
