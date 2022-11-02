import './general.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { LoginPage } from '../../pages/LoginPage/login-page'
import { RegisterPage } from '../../pages/RegisterPage/register-page'
import { ForgotPassPage } from '../../pages/ForgotPassPage/forgot-pass-page'
import { ResetPassPage } from '../../pages/ResetPassPage/reset-pass-page'
import { ProfilePage } from '../../pages/ProfilePage/propfile-page'
import { IngredientPage } from '../../pages/IngredientPage/ingredient-page'
import { MainPage } from '../../pages/MainPage/main-page'

function App() {
  return (
    <BrowserRouter>
      <AppHeader />

      <Switch>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassPage />
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
