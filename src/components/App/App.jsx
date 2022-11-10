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
import { LogoutPage } from '../../pages/LogoutPage/logout-page'
import { NotFound404 } from '../../pages/NotFound404/NotFound404'
import { StrictMode } from 'react'
import { ProtectedRoute } from '../protected-route'

function App() {
  return (
    <BrowserRouter>
      <StrictMode>
        <AppHeader />

        <Switch>
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

          <Route path="/" exact={true}>
            <MainPage />
          </Route>

          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>

          <Route path="/logout" exact={true}>
            <LogoutPage />
          </Route>

          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </StrictMode>
    </BrowserRouter>
  )
}

export default App
