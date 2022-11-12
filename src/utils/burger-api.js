import { deleteCookie, getCookie, setCookie } from './cookie-helper'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json;charset=utf-8' }
  if (getCookie('accessToken')) {
    headers.Authorization = `Bearer ${getCookie('accessToken')}`
  }
  return headers
}

const checkResponse = (res, onError = () => {}) => {
  if (res.ok) {
    return res.json()
  } else {
    onError()
    throw res
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
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
}

export const patchData = async (url, data) => {
  return sendRequest(`${BURGER_API_URL}/${url}`, {
    method: 'PATCH',
    headers: getHeaders(),
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

const checkAnswer = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const getDataWithToken = async url => {
  const options = {
    method: 'GET',
    headers: getHeaders()
  }

  try {
    const res = await fetch(`${BURGER_API_URL}/${url}`, options)

    return await checkAnswer(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const { refreshToken, accessToken } = await refreshTokenRequest()
      saveTokens(refreshToken, accessToken)

      options.headers.Authorization = `Bearer ${accessToken}`

      const res = await fetch(url, options)

      return await checkAnswer(res)
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
    deleteCookie('accessToken')
  }
}
