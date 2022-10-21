import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import burgerIngredientsCss from './burger-ingredients.module.css'
import { BurgerItemContext } from '../../services/burgerItemContext'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_INGREDIENT_TO_ORDER,
  CLEAR_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT
} from '../../services/actions'

export const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const ingredientsList = useSelector(
    state => state.allIngredients.ingredientsList
  )
  const [activeTab, setActiveTab] = useState({ id: 'bun', name: 'Булки' })
  const [modalOpened, setModalOpened] = useState(false)
  const tabsList = useMemo(
    () => [
      { id: 'bun', name: 'Булки' },
      { id: 'sauce', name: 'Соусы' },
      { id: 'main', name: 'Начинки' }
    ],
    []
  )
  const tabsRef = useRef()

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

  const bunNode = document.getElementById('bun')
  const sauceNode = document.getElementById('sauce')
  const mainNode = document.getElementById('main')

  const scrollIngredients = useCallback(() => {
    const tabsNodeY = tabsRef.current.getBoundingClientRect().top + 40

    const bunNodeY = bunNode.getBoundingClientRect().top - tabsNodeY
    const sauceNodeY = sauceNode.getBoundingClientRect().top - tabsNodeY
    const mainNodeY = mainNode.getBoundingClientRect().top - tabsNodeY

    if (bunNodeY < 0 && sauceNodeY > 0 && mainNodeY > 0) {
      setActiveTab(tabsList.find(t => t.id === 'bun'))
    } else if (sauceNodeY < 0 && bunNodeY < 0 && mainNodeY > 0) {
      setActiveTab(tabsList.find(t => t.id === 'sauce'))
    } else if (mainNodeY < 0) {
      setActiveTab(tabsList.find(t => t.id === 'main'))
    }
  }, [bunNode, mainNode, sauceNode, tabsList])

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

    // Удаление данных о просматриваемом ингридиенте
    dispatch({
      type: CLEAR_CURRENT_INGREDIENT
    })
  }

  useEffect(() => {
    const tabsNode = tabsRef.current
    tabsNode.addEventListener('scroll', scrollIngredients)

    return () => {
      tabsNode.removeEventListener('scroll', scrollIngredients)
    }
  }, [scrollIngredients])

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

      <div
        ref={tabsRef}
        className={`app-scroll pt-10 ${burgerIngredientsCss.items}`}
      >
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
