import { deleteCookie, getCookie, setCookie } from './cookie-helper'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json;charset=utf-8' }
  if (getCookie('accessToken')) {
    headers.Authorization = `Bearer ${getCookie('accessToken')}`
  }
  return headers
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

function sendRequest(url, options = {}) {
  return fetch(url, options).then(res => checkAnswer(res))
}

export const getData = async url => {
  return sendRequest(`${BURGER_API_URL}/${url}`)
}

const checkToken = async (err, url, options) => {
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

export const postData = async (url, data) => {
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }

  try {
    return sendRequest(`${BURGER_API_URL}/${url}`, options)
  } catch (err) {
    return checkToken(err, url, options)
  }
}

export const patchData = async (url, data) => {
  const options = {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }

  try {
    return sendRequest(`${BURGER_API_URL}/${url}`, options)
  } catch (err) {
    return checkToken(err, url, options)
  }
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
    return checkToken(err, url, options)
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
