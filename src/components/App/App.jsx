import './App.css'
import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients'
import { useState, useEffect } from 'react'
import { getIngredients } from '../../utils/burger-api'
import { IngredientsContext } from '../../services/appContext'

function App() {
  const [ingredientsList, setIngredientsList] = useState([])

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await getIngredients()
      setIngredientsList(data)
    }

    fetchIngredients()
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <IngredientsContext.Provider value={{ ingredientsList }}>
          <section className="main-section">
            <h2>Соберите бургер</h2>
            <BurgerIngredients ingredients={ingredientsList} />
          </section>
          <section>
            <BurgerConstructor />
          </section>
        </IngredientsContext.Provider>
      </main>
    </div>
  )
}

export default App
