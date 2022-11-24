import { FC } from 'react'
import { BurgerItem } from '../Burgeritem/BurgerItem'
import burgerType from './burger-type.module.css'
import { TIngredientItem } from '../../../utils/ingredient-types'

type TBurger = {
  title: string
  list: Array<TIngredientItem>
  id: string
}

export const BurgerType: FC<TBurger> = ({ title, list, id }) => {
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
