import fs from 'fs'
import { z } from 'zod'

const ConfigZod = z.object({
  segmentSize: z.number().min(1).max(100),
  folderPath: z.string().min(1).max(256),
  url: z.string().url(),
  modified: z.optional(z.number()),
})
export type Config = z.infer<typeof ConfigZod>

describe('zod document tests', () => {
  test('invalid config', () => {
    // ARRANGE
    const configText = fs.readFileSync('./tests/testdata/invalid_config.json')
    const configJson = JSON.parse(configText.toString())

    // ACT
    // ASSERT
    expect(() => ConfigZod.parse(configJson)).toThrow()
  })

  test('valid config', () => {
    // ARRANGE
    const configText = fs.readFileSync('./tests/testdata/valid_config.json')
    const configJson = JSON.parse(configText.toString())

    // ACT
    const config = ConfigZod.parse(configJson)

    // ASSERT
    expect(config.folderPath).toBe('/myfolder')
  })
})
