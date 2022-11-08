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
          <ProtectedRoute path="/" exact={true}>
            <MainPage />
          </ProtectedRoute>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassPage />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </StrictMode>
    </BrowserRouter>
  )
}

export default App
