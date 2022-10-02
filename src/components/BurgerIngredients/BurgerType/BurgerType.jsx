import { BurgerItem } from '../Burgeritem/BurgerItem'
import burgerType from './burger-type.module.css'

export const BurgerType = props => {
  return (
    <div>
      <h2 className={burgerType.title}>{props.title}</h2>
      <ul className={`pt-6 pb-10 pl-4 ${burgerType.items}`}>
        {props.list.map((item, idx) => (
          <BurgerItem menuItem={item} key={idx}></BurgerItem>
        ))}
      </ul>
    </div>
  )
}
