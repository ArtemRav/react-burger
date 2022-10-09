import './App.css'
import { AppHeader } from './components/AppHeader/AppHeader.jsx'
import { BurgerConstructor } from './components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from './components/BurgerIngredients/BurgerIngredients'
import { useState, useEffect } from 'react'
import { getIngredients } from './utils/burger-api'

function App() {
  const [ingredientsList, setIngridientsList] = useState([])

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await getIngredients('ingredients')
      setIngridientsList(data)
    }

    fetchIngredients()
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className="main-section">
          <h2>Соберите бургер</h2>
          <BurgerIngredients ingredients={ingredientsList} />
        </section>
        <section>
          <BurgerConstructor ingredients={ingredientsList} />
        </section>
      </main>
    </div>
  )
}

export default App
