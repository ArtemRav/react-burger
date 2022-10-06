import './App.css'
import { AppHeader } from './components/AppHeader/AppHeader.jsx'
import { BurgerConstructor } from './components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from './components/BurgerIngredients/BurgerIngredients'
import { useState, useEffect } from 'react'

function App() {
  const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

  const [ingredientsList, setIngridientsList] = useState([])

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const resp = await fetch(apiUrl)
        const { data } = await resp.json()
        setIngridientsList(data)
      } catch (err) {
        console.error(err)
      }
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
