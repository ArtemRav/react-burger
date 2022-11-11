import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWithToken } from '../services/actions/user'

export const withAuthCheck = WrapperComponent => () => {
  const isAutorized = useSelector(state => state.user.loginSuccess)
  const [userReceived, setUserReceived] = useState(false)

  const dispatch = useDispatch()

  const init = useCallback(async () => {
    await dispatch(getUserWithToken())
    setUserReceived(true)
  }, [dispatch])

  useEffect(() => {
    init()
  }, [init])

  return (
    <WrapperComponent userReceived={userReceived} isAutorized={isAutorized} />
  )
}
