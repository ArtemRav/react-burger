import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../services/actions/ingredients'
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients'

import style from './main-page.module.css'

export const MainPage = () => {
  const dispatch = useDispatch()

  const orderIngredients = useSelector(state => state.orderIngredients.items)
  const ingredientsList = useSelector(
    state => state.allIngredients.ingredientsList
  )

  useEffect(() => {
    // Избегаем лишних запросов при переходах между страницами
    if (!ingredientsList?.length) {
      dispatch(fetchIngredients())
    }
  }, [dispatch, ingredientsList])

  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <section className={style['left-part']}>
          <h2>Соберите бургер</h2>
          <BurgerIngredients />
        </section>

        <section className={style['right-part']}>
          <BurgerConstructor ingredientsList={orderIngredients} />
        </section>
      </main>
    </DndProvider>
  )
}
