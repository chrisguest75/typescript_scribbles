import fs from 'fs'
import { z } from 'zod'
import { LoadSimpleSchema } from '../src/simpleSchema'
import { LoadStrictSchema } from '../src/strictSchema'

describe('zod document tests', () => {
  test('invalid config missing fields', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(() => LoadSimpleSchema('./tests/testdata/invalid_config_missing_fields.json')).toThrow()
  })

  test('invalid config extra fields', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(() => LoadStrictSchema('./tests/testdata/invalid_config_extra_fields.json')).toThrow()
  })

  test('valid config', () => {
    // ARRANGE
    // ACT
    const config = LoadSimpleSchema('./tests/testdata/valid_config.json')

    // ASSERT
    expect(config.folderPath).toBe('/myfolder')
  })
})
