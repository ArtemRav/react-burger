import setCookie from './set-cookie'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = (res, onError = () => {}) => {
  if (res.ok) {
    return res.json()
  } else {
    onError()
    throw new Error(`Ошибка HTTP: ${res.status}`)
  }
}

function sendRequest(url, options = {}, onError) {
  return fetch(url, options).then(res => checkResponse(res, onError))
}

export const getData = async url => {
  return sendRequest(`${BURGER_API_URL}/${url}`)
}

export const postData = async (url, data, onError) => {
  return sendRequest(`${BURGER_API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}

export const saveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const refreshTokenRequest = () => {
  return postData('auth/token', {
    token: localStorage.getItem('refreshToken')
  })
}
