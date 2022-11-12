import './general.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AppHeader } from '../AppHeader/AppHeader.jsx'
import { LoginPage } from '../../pages/LoginPage/login-page'
import { RegisterPage } from '../../pages/RegisterPage/register-page'
import { ForgotPassPage } from '../../pages/ForgotPassPage/forgot-pass-page'
import { ResetPassPage } from '../../pages/ResetPassPage/reset-pass-page'
import { ProfilePage } from '../../pages/ProfilePage/propfile-page'
import { MainPage } from '../../pages/MainPage/main-page'
import { NotFound404 } from '../../pages/NotFound404/NotFound404'
import { StrictMode } from 'react'
import { ProtectedRoute } from '../protected-route'
import { withAuthCheck } from '../../hoc/with-auth-check'

import { useLocation, useHistory } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import { OrderDetails } from '../../components/OrderDetails/OrderDetails'

function App() {
  const WithAuthCheckLoginPage = withAuthCheck(LoginPage)
  const WithAuthCheckRegisterPage = withAuthCheck(RegisterPage)
  const WithAuthCheckForgotPage = withAuthCheck(ForgotPassPage)
  const WithAuthCheckResetPassPage = withAuthCheck(ResetPassPage)

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
          <Route path="/login" exact={true}>
            <WithAuthCheckLoginPage />
          </Route>

          <Route path="/register" exact={true}>
            <WithAuthCheckRegisterPage />
          </Route>

          <Route path="/forgot-password" exact={true}>
            <WithAuthCheckForgotPage />
          </Route>

          <Route path="/reset-password" exact={true}>
            <WithAuthCheckResetPassPage />
          </Route>

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
