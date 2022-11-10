import { getCookie, setCookie } from './cookie-helper'

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
  setCookie('accessToken', accessToken.split('Bearer ')[1])
  localStorage.setItem('refreshToken', refreshToken)
}

export const refreshTokenRequest = () => {
  return postData('auth/token', {
    token: localStorage.getItem('refreshToken')
  })
}

export const getDataWithToken = async url => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`
    }
  }
  try {
    return await sendRequest(`${BURGER_API_URL}/${url}`, options)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const { refreshToken, accessToken } = await refreshTokenRequest()
      saveTokens(refreshToken, accessToken)

      options.headers.authorization = `Bearer ${accessToken}`

      return await sendRequest(`${BURGER_API_URL}/${url}`, options)
    } else {
      return Promise.reject(err)
    }
  }
}

export const logOut = async () => {
  const res = await postData('auth/logout', {
    token: localStorage.getItem('refreshToken')
  })
  if (res.success) {
    localStorage.removeItem('refreshToken')
  }
}
