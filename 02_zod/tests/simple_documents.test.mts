import fs from 'fs'
import { z } from 'zod'
import { LoadSimpleSchema } from '../src/simpleSchema'

describe('zod document tests', () => {
  test('invalid config missing fields', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(() => LoadSimpleSchema('./tests/testdata/invalid_config_missing_fields.json')).toThrow()
  })

  test('invalid config extra fields', () => {
    // ARRANGE
    const configText = fs.readFileSync('./tests/testdata/invalid_config_extra_fields.json')
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
