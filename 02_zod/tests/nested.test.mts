import fs from 'fs'
import { z } from 'zod'
import { LoadNestedSchema } from '../src/nestedSchema'

describe('zod document tests', () => {
  test('valid nested config', () => {
    // ARRANGE
    // ACT
    const config = LoadNestedSchema('./tests/testdata/nested_schema.json')

    // ASSERT
    expect(config.words).toHaveLength(2)
  })
})
