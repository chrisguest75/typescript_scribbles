import { z } from 'zod'

const ConfigZod = z.object({
  rtmp: z.string().url(),
})
export type Config = z.infer<typeof ConfigZod>

describe('zod rtmp tests', () => {
  test('types', () => {
    // ARRANGE
    const rtmp = 'rtmps://example.com'
    const configObj = {
      rtmp,
    }

    // ACT
    const config = ConfigZod.parse(configObj)

    // ASSERT
    expect(config.rtmp).toBe(rtmp)
  })
})
