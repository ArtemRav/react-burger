import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppThunk } from './services/types/index'
import type { RootState, AppDispatch } from './services/types/index'

export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
