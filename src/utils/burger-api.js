const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = res => {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error(`Ошибка HTTP: ${res.status}`)
  }
}

function sendRequest(url, options = {}) {
  return fetch(url, options).then(checkResponse)
}

export const getData = async url => {
  return sendRequest(`${BURGER_API_URL}/${url}`)
}

export const postData = async (url, data) => {
  return sendRequest(`${BURGER_API_URL}/${url}`, data)
}
