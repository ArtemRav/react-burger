import { ThunkAction } from 'redux-thunk'
import { Action, ActionCreator } from 'redux'
import { store } from '../store'
import { TIngredientsActions } from '../actions/ingredients'
import { TOrderActions } from '../actions/order'
import { TIngredientDetailsActions } from '../actions'
import { TRecoverPasswordActions } from '../actions/recover-password'
import { TResetPasswordActions } from '../actions/reset-password'
import { TUserActions } from '../actions/user'
import { TFeedOrdersItem } from '../actions/feed-orders-item'

type TApplicationActions = TIngredientsActions &
  TOrderActions &
  TFeedOrdersItem &
  TIngredientDetailsActions &
  TRecoverPasswordActions &
  TResetPasswordActions &
  TUserActions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>
