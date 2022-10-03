import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from './../../utils/data.js'
import { BurgerType } from './BurgerType/BurgerType'
import burgerIngredients from './burger-ingredients.module.css'
import PropTypes from 'prop-types'

export const BurgerIngredients = props => {
  const [current, setCurrent] = useState('Булки')
  const tabsList = ['Булки', 'Соусы', 'Начинки']

  const burgersBun = data.filter(data => data.type === 'bun')
  const burgersMain = data.filter(data => data.type === 'main')
  const burgersSauce = data.filter(data => data.type === 'sauce')

  const toggleTab = val => {
    setCurrent(val)
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
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
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  )
}
