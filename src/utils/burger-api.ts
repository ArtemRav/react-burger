import { deleteCookie, getCookie, setCookie } from './cookie-helper'
const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

type THeader = Record<string, string>
type TPatchData = (url: string, data: any) => any
type TSaveTokens = (refreshToken: string, accessToken: string) => void
type TCheckToken = (
  err: { message: string },
  url: string,
  options: any
) => Promise<any>

export const saveTokens: TSaveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken.split('Bearer ')[1])
  localStorage.setItem('refreshToken', refreshToken)
}

export const refreshTokenRequest = () => {
  return postData('auth/token', {
    token: localStorage.getItem('refreshToken')
  })
}

const checkAnswer = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: unknown) => Promise.reject(err))
}

function sendRequest(url: string, options = {}) {
  return fetch(url, options).then(res => checkAnswer(res))
}

export const getData = async (url: string) => {
  return sendRequest(`${BURGER_API_URL}/${url}`)
}

const checkToken: TCheckToken = async (err, url, options) => {
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

export const getOrderByNumber = (number: number | string) => {
  return fetch(`${BURGER_API_URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => checkAnswer(res))
}

const getHeaders = () => {
  const headers: THeader = {
    'Content-Type': 'application/json;charset=utf-8'
  }
  if (getCookie('accessToken')) {
    headers.Authorization = `Bearer ${getCookie('accessToken')}`
  }
  return headers
}

export const postData: TPatchData = async (url, data) => {
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }

  try {
    return sendRequest(`${BURGER_API_URL}/${url}`, options)
  } catch (err: any) {
    return checkToken(err, url, options)
  }
}

export const patchData: TPatchData = async (url, data) => {
  const options = {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }

  try {
    return sendRequest(`${BURGER_API_URL}/${url}`, options)
  } catch (err: any) {
    return checkToken(err, url, options)
  }
}

export const getDataWithToken = async (url: string) => {
  const options = {
    method: 'GET',
    headers: getHeaders()
  }

  try {
    const res = await fetch(`${BURGER_API_URL}/${url}`, options)

    return await checkAnswer(res)
  } catch (err: any) {
    return checkToken(err, url, options)
  }
}

type TLogOutResponse = {
  success: boolean
}

export const logOut = async () => {
  const res: TLogOutResponse = await postData('auth/logout', {
    token: localStorage.getItem('refreshToken')
  })
  if (res.success) {
    localStorage.removeItem('refreshToken')
    deleteCookie('accessToken')
  }
}
