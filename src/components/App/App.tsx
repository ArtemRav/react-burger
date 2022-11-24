import './general.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AppHeader } from '../AppHeader/AppHeader.js'
import { LoginPage } from '../../pages/LoginPage/login-page'
import { RegisterPage } from '../../pages/RegisterPage/register-page'
import { ForgotPassPage } from '../../pages/ForgotPassPage/forgot-pass-page'
import { ResetPassPage } from '../../pages/ResetPassPage/reset-pass-page'
import { ProfilePage } from '../../pages/ProfilePage/propfile-page'
import { MainPage } from '../../pages/MainPage/main-page'
import { NotFound404 } from '../../pages/NotFound404/NotFound404'
import { StrictMode } from 'react'
import { ProtectedRoute } from '../protected-route'

import { useLocation, useHistory } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import { OrderDetails } from '../OrderDetails/OrderDetails'

function App() {
  const ModalSwitch = () => {
    const location = useLocation()
    const history = useHistory()
    let background = location.state && location.state.background

    const handleModalClose = () => {
      history.goBack()
    }

    return (
      <>
        <AppHeader />

        <Switch location={background || location}>
          <ProtectedRoute onlyUnAuth={true} path="/login" exact={true}>
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute onlyUnAuth={true} path="/register" exact={true}>
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            onlyUnAuth={true}
            path="/forgot-password"
            exact={true}
          >
            <ForgotPassPage />
          </ProtectedRoute>

          <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact={true}>
            <ResetPassPage />
          </ProtectedRoute>

          <Route path="/" exact={true}>
            <MainPage />
          </Route>

          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute
            path="/profile/orders/:orderNumber"
            children={<OrderDetails />}
            exact={true}
          />

          <Route path="/ingredients/:ingredientId" exact={true}>
            <IngredientDetails />
          </Route>

          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <Route
            path="/ingredients/:ingredientId"
            children={
              <Modal title="Детали ингридиента" closeModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </>
    )
  }

  return (
    <BrowserRouter>
      <StrictMode>
        <ModalSwitch />
      </StrictMode>
    </BrowserRouter>
  )
}

export default App
