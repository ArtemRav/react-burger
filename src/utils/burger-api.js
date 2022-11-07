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
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
