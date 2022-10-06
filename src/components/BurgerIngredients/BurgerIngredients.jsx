import { useState, useMemo } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import burgerIngredients from './burger-ingredients.module.css'
import PropTypes from 'prop-types'
import { burgerListItemPropTypes } from '../../utils/prop-types.js'

export const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState('Булки')
  const tabsList = ['Булки', 'Соусы', 'Начинки']

  const burgersBun = useMemo(
    () => ingredients.filter(item => item.type === 'bun'),
    [ingredients]
  )
  const burgersMain = useMemo(
    () => ingredients.filter(item => item.type === 'main'),
    [ingredients]
  )
  const burgersSauce = useMemo(
    () => ingredients.filter(item => item.type === 'sauce'),
    [ingredients]
  )

  const toggleTab = val => {
    setCurrent(val)
  }

  return (
    ingredients.length && (
      <>
        <div className="flex-wrap">
          {tabsList.map(item => (
            <Tab
              value={item}
              active={current === item}
              key={item}
              onClick={toggleTab}
            >
              {item}
            </Tab>
          ))}
        </div>
        <div className={`app-scroll pt-10 ${burgerIngredients.items}`}>
          <BurgerType list={burgersBun} title="Булки" />
          <BurgerType list={burgersSauce} title="Соусы" />
          <BurgerType list={burgersMain} title="Начинки" />
        </div>
      </>
    )
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerListItemPropTypes())
}
