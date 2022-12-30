import { checkAnswer } from '../utils/burger-api'

describe('Check fn checkAnswer', () => {
  test('Should be successful answer', () => {
    const testResponse = {
      ok: true,
      json: () => ({ result: 'OK' })
    }

    const answer = checkAnswer(testResponse)

    expect(answer).toEqual({ result: 'OK' })
  })

  test('Should be failed answer', () => {
    const testResponse = {
      ok: false,
      status: 400
    }

    const answer = checkAnswer(testResponse)

    return expect(answer).rejects.toBe('Ошибка: 400')
  })
})
