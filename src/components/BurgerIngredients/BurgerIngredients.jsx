import { useState, useMemo, useCallback } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import burgerIngredientsCss from './burger-ingredients.module.css'
import PropTypes from 'prop-types'
import { burgerListItemPropTypes } from '../../utils/prop-types.js'

export const BurgerIngredients = ({ ingredients }) => {
  const [activeTab, setActiveTab] = useState({ id: 'bun', name: 'Булки' })
  const [modalOpened, setModalOpened] = useState(false)
  const [itemSelected, setItemSelected] = useState()
  const tabsList = [
    { id: 'bun', name: 'Булки' },
    { id: 'sauce', name: 'Соусы' },
    { id: 'main', name: 'Начинки' }
  ]

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

  const toggleTab = useCallback(tab => {
    setActiveTab(tab.name)
    document.querySelector(`#${tab.id}`).scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  const openModal = useCallback(item => {
    setItemSelected(item)
    setModalOpened(true)
  }, [])

  const closeModal = () => {
    setModalOpened(false)
  }

  return (
    ingredients.length && (
      <>
        <div className="flex-wrap">
          {tabsList.map(tab => (
            <Tab
              value={tab.name}
              active={activeTab === tab.name}
              key={tab.name}
              onClick={() => toggleTab(tab)}
            >
              {tab.name}
            </Tab>
          ))}
        </div>
        <div className={`app-scroll pt-10 ${burgerIngredientsCss.items}`}>
          <BurgerType
            id="bun"
            openModal={openModal}
            list={burgersBun}
            title="Булки"
          />
          <BurgerType
            id="sauce"
            openModal={openModal}
            list={burgersSauce}
            title="Соусы"
          />
          <BurgerType
            id="main"
            openModal={openModal}
            list={burgersMain}
            title="Начинки"
          />
        </div>

        {modalOpened && (
          <Modal title="Детали ингридиента" closeModal={closeModal}>
            <IngredientDetails {...itemSelected} />
          </Modal>
        )}
      </>
    )
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerListItemPropTypes())
}
