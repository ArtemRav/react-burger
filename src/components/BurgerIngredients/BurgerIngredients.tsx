import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerType } from './BurgerType/BurgerType'
import burgerIngredientsCss from './burger-ingredients.module.css'

import { BUN, MAIN, SAUCE, TIngredientItem } from '../../services/types/data'
import { useAppSelector } from '../../hooks'

export const BurgerIngredients = () => {
  type TTab = {
    id: typeof BUN | typeof SAUCE | typeof MAIN
    name: string
  }

  type TToggleTab = (tab: TTab) => void

  const ingredientsList = useAppSelector(
    state => state.allIngredients.ingredientsList
  )
  const [activeTab, setActiveTab] = useState<TTab | any>({
    id: BUN,
    name: 'Булки'
  })

  const tabsList = useAppSelector(state => state.allIngredients.ingredientTabs)
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

  const bunNode: HTMLElement | null = document.getElementById(BUN)
  const sauceNode: HTMLElement | null = document.getElementById(SAUCE)
  const mainNode: HTMLElement | null = document.getElementById(MAIN)

  const scrollIngredients = useCallback(() => {
    const tabsNodeY = tabsRef.current.getBoundingClientRect().top + 40

    const bunNodeY = bunNode
      ? bunNode.getBoundingClientRect().top - tabsNodeY
      : 0
    const sauceNodeY = sauceNode
      ? sauceNode.getBoundingClientRect().top - tabsNodeY
      : 0
    const mainNodeY = mainNode
      ? mainNode.getBoundingClientRect().top - tabsNodeY
      : 0

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
    const modalRoot = document.querySelector(`#${tab.id}`) as HTMLDivElement
    modalRoot.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const tabsNode: HTMLElement = tabsRef.current
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
