import './general.css'
import appCss from './app.module.css'
import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../services/actions/ingredients'

function App() {
  const dispatch = useDispatch()
  const orderIngredients = useSelector(state => state.orderIngredients.items)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className={appCss['main-section']}>
          <h2>Соберите бургер</h2>
          <BurgerIngredients />
        </section>
        <section>
          {orderIngredients.length > 0 && (
            <BurgerConstructor ingredientsList={orderIngredients} />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
