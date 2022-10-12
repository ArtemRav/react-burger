const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const wrapperGetRequest = async url => {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const { data } = await response.json()
      return data
    } else {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }
  } catch (err) {
    console.error(err)
  }
}

const wrapperPostRequest = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }
  } catch (err) {
    console.error(err)
  }
}

export const getData = async url => {
  return wrapperGetRequest(`${BURGER_API_URL}/${url}`)
}

export const postData = async (url, data) => {
  return wrapperPostRequest(`${BURGER_API_URL}/${url}`, data)
}
