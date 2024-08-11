import { ExampleSingleton } from '../src/exampleSingleton'

describe('Singleton', () => {
  it('can initialise to the same object', () => {
    // ARRANGE
    const singleton1 = ExampleSingleton.getInstance()

    // ACT
    singleton1.setValue(10)

    // ASSERT
    expect(singleton1.getValue()).toBe(10)
    const singleton2 = ExampleSingleton.getInstance()
    expect(singleton2.getValue()).toBe(10)
    expect(singleton1).toBe(singleton2)

    singleton1.setValue(30)
    expect(singleton2.getValue()).toBe(30)
  })
})
