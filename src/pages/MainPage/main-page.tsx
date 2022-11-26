import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients'

import style from './main-page.module.css'

export const MainPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <section className={style['left-part']}>
          <h2>Соберите бургер</h2>
          <BurgerIngredients />
        </section>

        <section className={style['right-part']}>
          <BurgerConstructor />
        </section>
      </main>
    </DndProvider>
  )
}
