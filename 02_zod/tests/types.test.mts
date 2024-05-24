import { z } from 'zod'

const ConfigZod = z.object({
  segmentSize: z.number().min(1).max(100),
  folderPath: z.string().min(1).max(256),
  url: z.string().url(),
  uuid: z.string().uuid(),
  nanoid: z.string().nanoid(),
  cuid: z.string().cuid(),
  cuid2: z.string().cuid2(),
  ulid: z.string().ulid(),
  regex: z.string().regex(/^TEST_[a-z0-9]+$/),
  includes: z.array(z.string().min(1)),
  startsWith: z.string().startsWith('TEST_'),
  ip: z.string().ip(),
  modified: z.optional(z.number()),
  array: z.array(z.number()),
})
export type Config = z.infer<typeof ConfigZod>

describe('zod types tests', () => {
  test('types', () => {
    // ARRANGE
    const configObj = {
      segmentSize: 10,
      folderPath: '/myfolder',
      url: 'http://example.com',
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      nanoid: 'V1StGXR8_Z5jdHi6B-myT',
      cuid: 'cjk1q7z9d0000j2x5y5x6x0gk',
      cuid2: 'cjk1q7z9d0000j2x5y5x6x0gk',
      ulid: '01D9K1Z6ZTQVXJYFQWZ3VZJQZJ',
      regex: 'TEST_123',
      includes: ['a', 'b'],
      startsWith: 'TEST_AGAIN',
      ip: '192.168.0.0',
      modified: 1234567890,
      array: [1, 2, 3],
    }

    // ACT
    const config = ConfigZod.parse(configObj)

    // ASSERT
    expect(config.folderPath).toBe('/myfolder')
  })
})
