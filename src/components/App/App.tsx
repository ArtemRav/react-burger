import './general.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AppHeader } from '../AppHeader/AppHeader'
import { LoginPage } from '../../pages/LoginPage/login-page'
import { RegisterPage } from '../../pages/RegisterPage/register-page'
import { ForgotPassPage } from '../../pages/ForgotPassPage/forgot-pass-page'
import { ResetPassPage } from '../../pages/ResetPassPage/reset-pass-page'
import { ProfilePage } from '../../pages/ProfilePage/propfile-page'
import { MainPage } from '../../pages/MainPage/main-page'
import { NotFound404 } from '../../pages/NotFound404/NotFound404'
import { StrictMode, useEffect } from 'react'
import { ProtectedRoute } from '../protected-route'

import { useLocation, useHistory } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { IngredientDetails } from '../IngredientDetails/IngredientDetails'
import { fetchIngredients } from '../../services/actions/ingredients'
import { FeedPage } from '../../pages/FeedPage/feed-page'
import { OrderPage } from '../../pages/OrderPage/order-page'
import { useAppDispatch, useAppSelector } from '../../hooks'

function App() {
  const dispatch = useAppDispatch()

  const ingredientsList = useAppSelector(
    state => state.allIngredients.ingredientsList
  )

  useEffect(() => {
    // Избегаем лишних запросов при переходах между страницами
    if (!ingredientsList?.length) {
      dispatch(fetchIngredients())
    }
  }, [dispatch, ingredientsList])

  const ModalSwitch = () => {
    interface ILocation {
      from?: string
      background?: any
      pathname?: string
    }

    const location = useLocation<ILocation>()
    const history = useHistory()
    const background = location.state && location.state.background

    const handleModalClose = () => {
      history.goBack()
    }

    return (
      <>
        <AppHeader />

        <Switch location={background || location}>
          <Route path="/" exact>
            <MainPage />
          </Route>

          <Route path="/feed" exact>
            <FeedPage />
          </Route>

          <Route path="/feed/:id" exact>
            <OrderPage />
          </Route>

          <Route path="/ingredients/:ingredientId" exact>
            <IngredientDetails />
          </Route>

          <ProtectedRoute onlyUnAuth={true} path="/login" exact>
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute onlyUnAuth={true} path="/register" exact>
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
            <ForgotPassPage />
          </ProtectedRoute>

          <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact>
            <ResetPassPage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id" exact>
            <OrderPage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <Route
            path="/ingredients/:ingredientId"
            children={
              <Modal title="Детали ингредиента" closeModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}

        {background && (
          <Route
            path="/feed/:id"
            children={
              <Modal title="" closeModal={handleModalClose}>
                <OrderPage />
              </Modal>
            }
          />
        )}

        {background && (
          <Route
            path="/profile/orders/:id"
            children={
              <Modal title="" closeModal={handleModalClose}>
                <OrderPage />
              </Modal>
            }
          />
        )}
      </>
    )
  }

  return (
    <BrowserRouter>
      {/* <StrictMode> */}
      <ModalSwitch />
      {/* </StrictMode> */}
    </BrowserRouter>
  )
}

export default App
