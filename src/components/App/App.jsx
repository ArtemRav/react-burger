import './general.css'
import appCss from './app.module.css'
import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../services/actions/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const dispatch = useDispatch()
  const orderIngredients = useSelector(state => state.orderIngredients.items)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  return (
    <div className="App">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main>
          <section className={appCss['left-part']}>
            <h2>Соберите бургер</h2>
            <BurgerIngredients />
          </section>

          <section className={appCss['right-part']}>
            <BurgerConstructor ingredientsList={orderIngredients} />
          </section>
        </main>
      </DndProvider>
    </div>
  )
}

export default App
