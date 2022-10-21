import { useState, useMemo, useCallback } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import burgerIngredientsCss from './burger-ingredients.module.css'
import { BurgerItemContext } from '../../services/burgerItemContext'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_INGREDIENT_TO_ORDER,
  SET_CURRENT_INGREDIENT
} from '../../services/actions'

export const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const ingredientsList = useSelector(
    state => state.allIngredients.ingredientsList
  )
  const [activeTab, setActiveTab] = useState({ id: 'bun', name: 'Булки' })
  const [modalOpened, setModalOpened] = useState(false)
  // const [itemSelected, setItemSelected] = useState()
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

  const openModal = useCallback(
    item => {
      // Добавить ингридиент в заказа
      dispatch({
        type: ADD_INGREDIENT_TO_ORDER,
        item
      })

      // Показать модальное окно по ингридиенту
      // setItemSelected(item)
      dispatch({
        type: SET_CURRENT_INGREDIENT,
        item
      })
      setModalOpened(true)
    },
    [dispatch]
  )

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
          <IngredientDetails />
        </Modal>
      )}
    </>
  )
}
