import { describe, test, expect } from '@jest/globals'
import { greet, greetFail } from './greet'

describe('greet', () => {
  test('Greets with username provided', async () => {
    // ARRANGE
    // ACT
    const greeted = await greet('Chris')
    // ASSERT
    expect(greeted).toBe('Hello, Chris!')
  })

  test('Fails to greets with username provided', async () => {
    // ARRANGE
    // ACT
    // ASSERT
    await expect(greetFail('Chris')).rejects.toThrow(Error);
    await expect(greetFail('Chris')).rejects.toThrow('Failed to greet');
  })
})
