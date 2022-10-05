import './App.css'
import { AppHeader } from './components/AppHeader/AppHeader.jsx'
import { BurgerConstructor } from './components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from './components/BurgerIngredients/BurgerIngredients'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className="main-section">
          <h2>Соберите бургер</h2>
          <BurgerIngredients />
        </section>
        <section>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  )
}

export default App
