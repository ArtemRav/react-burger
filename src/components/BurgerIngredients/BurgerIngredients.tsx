import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import burgerIngredientsCss from './burger-ingredients.module.css'
import { useSelector } from 'react-redux'

import { BUN, SAUCE, MAIN, TIngredientItem } from '../../utils/ingredient-types'
import { TState } from '../../services/reducers'

export const BurgerIngredients = () => {
  // TYPE START
  type TTab = {
    id: typeof BUN | typeof SAUCE | typeof MAIN
    name: string
  }

  type TToggleTab = (tab: TTab) => void
  // TYPES END

  const ingredientsList = useSelector(
    (state: TState) => state.allIngredients.ingredientsList
  )
  const [activeTab, setActiveTab] = useState<TTab | any>({
    id: BUN,
    name: 'Булки'
  })

  const tabsList = useSelector(
    (state: TState) => state.allIngredients.ingredientTabs
  )
  const tabsRef = useRef<HTMLDivElement | any>(null)

  const burgersBun = useMemo(
    () => ingredientsList.filter((item: TIngredientItem) => item.type === BUN),
    [ingredientsList]
  )
  const burgersMain = useMemo(
    () => ingredientsList.filter((item: TIngredientItem) => item.type === MAIN),
    [ingredientsList]
  )
  const burgersSauce = useMemo(
    () =>
      ingredientsList.filter((item: TIngredientItem) => item.type === SAUCE),
    [ingredientsList]
  )

  const bunNode: any = document.getElementById(BUN)
  const sauceNode: any = document.getElementById(SAUCE)
  const mainNode: any = document.getElementById(MAIN)

  const scrollIngredients = useCallback(() => {
    const tabsNodeY = tabsRef.current.getBoundingClientRect().top + 40

    const bunNodeY = bunNode.getBoundingClientRect().top - tabsNodeY
    const sauceNodeY = sauceNode.getBoundingClientRect().top - tabsNodeY
    const mainNodeY = mainNode.getBoundingClientRect().top - tabsNodeY

    if (bunNodeY < 0 && sauceNodeY > 0 && mainNodeY > 0) {
      setActiveTab(tabsList.find(tab => tab.id === BUN))
    } else if (sauceNodeY < 0 && bunNodeY < 0 && mainNodeY > 0) {
      setActiveTab(tabsList.find(tab => tab.id === SAUCE))
    } else if (mainNodeY < 0) {
      setActiveTab(tabsList.find(tab => tab.id === MAIN))
    }
  }, [bunNode, mainNode, sauceNode, tabsList])

  const toggleTab = useCallback<TToggleTab>(tab => {
    setActiveTab(tab)
    document.querySelector(`#${tab.id}`).scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const tabsNode: any = tabsRef.current
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
