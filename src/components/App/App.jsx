import './general.css'
import appCss from './app.module.css'
import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients'
import { useEffect } from 'react'
import { getData } from '../../utils/burger-api'

import { useDispatch, useSelector } from 'react-redux'
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../../services/actions'

function App() {
  const dispatch = useDispatch()
  const orderIngredients = useSelector(state => state.orderIngredients.items)

  useEffect(() => {
    const fetchIngredients = async () => {
      dispatch({ type: GET_INGREDIENTS_REQUEST })
      try {
        const { data } = await getData('ingredients')
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data
        })
      } catch (error) {
        dispatch({ type: GET_INGREDIENTS_FAILED })
        console.error(error)
      }
    }

    fetchIngredients()
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
          {orderIngredients.length && (
            <BurgerConstructor ingredientsList={orderIngredients} />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
