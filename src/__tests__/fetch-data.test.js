/* eslint-disable jest/valid-expect */
import { getData } from '../utils/burger-api'

describe('Check get request api', () => {
  beforeEach(
    jest.spyOn(global, 'fetch').mockResolvedValue(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 'OK' })
      })
    )
  )

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // test('Fetch ingredients should be successful', async () => {
  //   expect(getData('ingredients')).resolves.toBe({ result: 'OK' })
  // })

  test('Fetch ingredients should be failed', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'OK' }),
        status: 500
      })
    )

    expect(getData('ingredients')).rejects.toBe('Ошибка: 500')
  })
})
