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
import { useDispatch, useSelector } from 'react-redux'
import { TState } from '../../services/reducers'
import { fetchIngredients } from '../../services/actions/ingredients'
import { FeedPage } from '../../pages/FeedPage/feed-page'
import { OrderPage } from '../../pages/OrderPage/order-page'

function App() {
  const dispatch = useDispatch<any>()

  const ingredientsList = useSelector(
    (state: TState) => state.allIngredients.ingredientsList
  )

  useEffect(() => {
    // Избегаем лишних запросов при переходах между страницами
    if (!ingredientsList?.length) {
      dispatch(fetchIngredients())
    }
  }, [dispatch, ingredientsList])

  const ModalSwitch = () => {
    interface ILocation {
      from?: any
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

          <Route path="/" exact>
            <MainPage />
          </Route>

          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <Route path="/profile/orders/:id" exact>
            <OrderPage />
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
