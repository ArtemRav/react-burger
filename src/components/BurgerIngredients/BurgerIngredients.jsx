import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import burgerIngredientsCss from './burger-ingredients.module.css'
import { useSelector } from 'react-redux'

import { BUN, SAUCE, MAIN } from '../../utils/ingredient-types'

export const BurgerIngredients = () => {
  const ingredientsList = useSelector(
    state => state.allIngredients.ingredientsList
  )
  const [activeTab, setActiveTab] = useState({ id: BUN, name: 'Булки' })
  const tabsList = useSelector(state => state.allIngredients.ingredientTabs)
  const tabsRef = useRef()

  const burgersBun = useMemo(
    () => ingredientsList.filter(item => item.type === BUN),
    [ingredientsList]
  )
  const burgersMain = useMemo(
    () => ingredientsList.filter(item => item.type === MAIN),
    [ingredientsList]
  )
  const burgersSauce = useMemo(
    () => ingredientsList.filter(item => item.type === SAUCE),
    [ingredientsList]
  )

  const bunNode = document.getElementById(BUN)
  const sauceNode = document.getElementById(SAUCE)
  const mainNode = document.getElementById(MAIN)

  const scrollIngredients = useCallback(() => {
    const tabsNodeY = tabsRef.current.getBoundingClientRect().top + 40

    const bunNodeY = bunNode.getBoundingClientRect().top - tabsNodeY
    const sauceNodeY = sauceNode.getBoundingClientRect().top - tabsNodeY
    const mainNodeY = mainNode.getBoundingClientRect().top - tabsNodeY

    if (bunNodeY < 0 && sauceNodeY > 0 && mainNodeY > 0) {
      setActiveTab(tabsList.find(t => t.id === BUN))
    } else if (sauceNodeY < 0 && bunNodeY < 0 && mainNodeY > 0) {
      setActiveTab(tabsList.find(t => t.id === SAUCE))
    } else if (mainNodeY < 0) {
      setActiveTab(tabsList.find(t => t.id === MAIN))
    }
  }, [bunNode, mainNode, sauceNode, tabsList])

  const toggleTab = useCallback(tab => {
    setActiveTab(tab)
    document.querySelector(`#${tab.id}`).scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

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
        <BurgerType id="bun" list={burgersBun} title="Булки" />
        <BurgerType id="sauce" list={burgersSauce} title="Соусы" />
        <BurgerType id="main" list={burgersMain} title="Начинки" />
      </div>
    </>
  )
}
