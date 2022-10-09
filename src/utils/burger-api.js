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

export const getIngredients = async url => {
  return wrapperGetRequest(`${BURGER_API_URL}/${url}`)
}
