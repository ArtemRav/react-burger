import { useState, useMemo, useCallback, useContext } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import burgerIngredientsCss from './burger-ingredients.module.css'
import PropTypes from 'prop-types'
import { burgerListItemPropTypes } from '../../utils/prop-types.js'
import { IngredientsContext } from '../../services/appContext'

export const BurgerIngredients = () => {
  const { ingredientsList } = useContext(IngredientsContext)
  const [activeTab, setActiveTab] = useState({ id: 'bun', name: 'Булки' })
  const [modalOpened, setModalOpened] = useState(false)
  const [itemSelected, setItemSelected] = useState()
  const tabsList = [
    { id: 'bun', name: 'Булки' },
    { id: 'sauce', name: 'Соусы' },
    { id: 'main', name: 'Начинки' }
  ]

  const burgersBun = useMemo(
    () => ingredientsList.filter(item => item.type === 'bun'),
    [ingredientsList]
  )
  const burgersMain = useMemo(
    () => ingredientsList.filter(item => item.type === 'main'),
    [ingredientsList]
  )
  const burgersSauce = useMemo(
    () => ingredientsList.filter(item => item.type === 'sauce'),
    [ingredientsList]
  )

  const toggleTab = useCallback(tab => {
    setActiveTab(tab)
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
    ingredientsList.length && (
      <>
        <div className="flex-wrap">
          {tabsList.map(tab => (
            <Tab
              value={tab.name}
              active={activeTab.id === tab.id}
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
  ingredientsList: PropTypes.arrayOf(burgerListItemPropTypes())
}
