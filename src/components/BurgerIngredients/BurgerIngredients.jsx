import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from './../../utils/data.js'
import { BurgerType } from './BurgerType/BurgerType'
import burgerIngredients from './burger-ingredients.module.css'
import PropTypes from 'prop-types'

export const BurgerIngredients = props => {
  const [current, setCurrent] = useState('Булки')
  const burgersBun = data.filter(data => data.type === 'bun')
  const burgersMain = data.filter(data => data.type === 'main')
  const burgersSauce = data.filter(data => data.type === 'sauce')

  return (
    <>
      <div className="mb-10" style={{ display: 'flex' }}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={`main-scrollbar ${burgerIngredients.items}`}>
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
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number
    })
  )
}
