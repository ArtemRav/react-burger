import './App.css'
import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients'
import { useState, useEffect, useReducer } from 'react'
import { getData } from '../../utils/burger-api'
import { IngredientsContext } from '../../services/appContext'

const initialState = { orderItems: [] }

function reducer(state, action) {
  // Вопрос к ревьюверу: код сюда заходит два раза, хотя вызов reducer происходит из handleAddIngredient
  // в который код заходит только один раз, почему handleAddIngredient вызывается один раз, а reducer вызывается два ???
  switch (action.type) {
    case 'add':
      const bunIdx = state.orderItems.findIndex(
        item => item.type === 'bun' && item.type === action.item.type
      )
      if (~bunIdx) {
        state.orderItems.splice(bunIdx, 1, action.item)
      } else if (!state.orderItems.find(item => item._id === action.item._id)) {
        state.orderItems.push(action.item)
      }
      return { orderItems: [...state.orderItems] }

    case 'del':
      const items = state.orderItems.filter(o => o._id !== action.item._id)
      return { orderItems: [...items] }

    default:
      return initialState
  }
}

function App() {
  const [ingredientsList, setIngredientsList] = useState([])

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleAddIngredient = ingredient => {
    dispatch({ type: 'add', item: ingredient })
  }

  const handleDelIngredient = ingredient => {
    dispatch({ type: 'del', item: ingredient })
  }

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data } = await getData('ingredients')
        setIngredientsList(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchIngredients()
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <IngredientsContext.Provider
          value={{ ingredientsList, handleDelIngredient }}
        >
          <section className="main-section">
            <h2>Соберите бургер</h2>
            <BurgerIngredients handleAddIngredient={handleAddIngredient} />
          </section>
          <section>
            {state.orderItems.length && (
              <BurgerConstructor ingredientsList={state.orderItems} />
            )}
          </section>
        </IngredientsContext.Provider>
      </main>
    </div>
  )
}

export default App
