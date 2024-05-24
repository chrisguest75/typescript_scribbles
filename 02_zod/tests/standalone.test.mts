import { z } from 'zod'

describe('zod standalone tests', () => {
  test('types', () => {
    // ARRANGE
    const UrlType = z.string().url()
    const configUrl = 'http://example.com'

    // ACT
    const url = UrlType.parse(configUrl)

    // ASSERT
    expect(url).toBe(configUrl)
  })
})
