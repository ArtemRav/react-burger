import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
  getUser,
  getUserWithToken,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  TOGGLE_USER_AUTH_CHECKED
} from '../../actions/user'
import { userReducer } from '../user'

const initialState = {
  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,
  isAuthChecked: false,
  userInfo: {
    name: '',
    email: '',
    password: ''
  }
}

describe('Redux auth reducer', () => {
  test('Should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  test('Should handle request', () => {
    expect(userReducer(undefined, { type: GET_USER_REQUEST })).toEqual({
      ...initialState,
      loginRequest: true
    })
  })

  test('Should handle success', () => {
    const userInfo = { name: 'Artem', email: 'gp@lol.com', password: 'gagaga' }
    expect(
      userReducer(undefined, { type: GET_USER_SUCCESS, payload: userInfo })
    ).toEqual({
      ...initialState,
      loginSuccess: true,
      userInfo
    })
  })

  test('Should handle failed', () => {
    expect(userReducer(undefined, { type: GET_USER_FAILED })).toEqual({
      ...initialState,
      loginFailed: true,
      loginRequest: false,
      loginSuccess: false
    })
  })

  test('Should handle checked', () => {
    expect(userReducer(undefined, { type: TOGGLE_USER_AUTH_CHECKED })).toEqual({
      ...initialState,
      isAuthChecked: !initialState.isAuthChecked
    })
  })
})

describe('USET thunks', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Should successfully complete getUser', async () => {
    // Arrange
    const userStub = { name: 'pilot', email: 'pilot@gmail.com' }

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        user: userStub,
        refreshToken: 'ghsdfglkdjh234',
        accessToken: 'nkbjsndflgkjn3435'
      }),
      ok: true
    })

    const middllewares = [thunk]
    const mockStore = configureMockStore(middllewares)
    const expectedActions = [
      { type: GET_USER_REQUEST },
      { type: GET_USER_SUCCESS, payload: userStub }
    ]
    const store = mockStore({
      loginRequest: false,
      loginFailed: false,
      loginSuccess: false,
      isAuthChecked: false,
      userInfo: {
        name: '',
        email: '',
        password: ''
      }
    })

    // Act
    await store.dispatch(getUser())
    const evaluatedActions = store.getActions()

    // Assert
    expect(evaluatedActions).toEqual(expectedActions)
  })

  test('Should unsuccessfully complete getUser', async () => {
    // Arrange
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: false,
        error: 'Error auth'
      }),
      ok: false,
      status: 401
    })

    const middllewares = [thunk]
    const mockStore = configureMockStore(middllewares)
    const expectedActions = [
      { type: GET_USER_REQUEST },
      { type: GET_USER_FAILED }
    ]
    const store = mockStore({
      loginRequest: false,
      loginFailed: false,
      loginSuccess: false,
      isAuthChecked: false
    })

    // Act
    await store.dispatch(getUser())
    const evaluatedActions = store.getActions()

    // Assert
    expect(evaluatedActions).toEqual(expectedActions)
  })

  test('Should successfully complete getUserWithToken', async () => {
    // Arrange
    const userStub = { name: 'pilot', email: 'pilot@gmail.com' }

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        user: userStub
      }),
      ok: true
    })

    const middllewares = [thunk]
    const mockStore = configureMockStore(middllewares)
    const expectedActions = [
      { type: GET_USER_REQUEST },
      { type: GET_USER_SUCCESS, payload: userStub }
    ]
    const store = mockStore({
      loginRequest: false,
      loginFailed: false,
      loginSuccess: false,
      isAuthChecked: false,
      userInfo: {
        name: '',
        email: '',
        password: ''
      }
    })

    // Act
    await store.dispatch(getUserWithToken())
    const evaluatedActions = store.getActions()

    // Assert
    expect(evaluatedActions).toEqual(expectedActions)
  })

  test('Should unsuccessfully complete getUserWithToken', async () => {
    // Arrange
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: false,
        error: 'Error auth'
      }),
      ok: false,
      status: 401
    })

    const middllewares = [thunk]
    const mockStore = configureMockStore(middllewares)
    const expectedActions = [
      { type: GET_USER_REQUEST },
      { type: GET_USER_FAILED }
    ]
    const store = mockStore({
      loginRequest: false,
      loginFailed: false,
      loginSuccess: false,
      isAuthChecked: false
    })

    // Act
    await store.dispatch(getUserWithToken())
    const evaluatedActions = store.getActions()

    // Assert
    expect(evaluatedActions).toEqual(expectedActions)
  })
})
