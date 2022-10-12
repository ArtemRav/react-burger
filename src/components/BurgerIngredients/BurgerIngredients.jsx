import { useState, useMemo, useCallback, useContext } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import burgerIngredientsCss from './burger-ingredients.module.css'
import PropTypes from 'prop-types'
import { burgerListItemPropTypes } from '../../utils/prop-types.js'
import { IngredientsContext } from '../../services/appContext'
import { BurgerItemContext } from '../../services/burgerItemContext'

export const BurgerIngredients = ({ handleAddIngredient }) => {
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
    // Тест добавления ингридиентов в заказ
    handleAddIngredient(item)

    // Отключаем временно показ модалки
    // setItemSelected(item)
    // setModalOpened(true)
  }, [])

  const closeModal = () => {
    setModalOpened(false)
  }

  return (
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
        <BurgerItemContext.Provider value={{ openModal }}>
          <BurgerType id="bun" list={burgersBun} title="Булки" />
          <BurgerType id="sauce" list={burgersSauce} title="Соусы" />
          <BurgerType id="main" list={burgersMain} title="Начинки" />
        </BurgerItemContext.Provider>
      </div>

      {modalOpened && (
        <Modal title="Детали ингридиента" closeModal={closeModal}>
          <IngredientDetails {...itemSelected} />
        </Modal>
      )}
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredientsList: PropTypes.arrayOf(burgerListItemPropTypes()),
  handleAddIngredient: PropTypes.func.isRequired
}
