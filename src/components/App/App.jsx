import './App.css'
import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients'
import { useState, useEffect } from 'react'
import { getIngredients } from '../../utils/burger-api'

function App() {
  const [ingredientsList, setIngridientsList] = useState([])

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await getIngredients()
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
