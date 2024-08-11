import { MetricValue } from '../src/metricValue'

describe('MetricValue', () => {
  it('can have an initial value', () => {
    // ARRANGE
    const counter = new MetricValue(10)

    // ACT
    counter.increment()

    // ASSERT
    expect(counter?.getValue()).toBe(11)
  })

  it('can be incremented', () => {
    // ARRANGE
    const counter = new MetricValue()

    // ACT
    counter.increment()

    // ASSERT
    expect(counter?.getValue()).toBe(1)
  })

  it('can be decremented', () => {
    // ARRANGE
    const counter = new MetricValue(10)

    // ACT
    counter.decrement()

    // ASSERT
    expect(counter?.getValue()).toBe(9)
  })

  it('can have value set', () => {
    // ARRANGE
    const counter = new MetricValue(10)

    // ACT
    counter.setValue(100)

    // ASSERT
    expect(counter?.getValue()).toBe(100)
  })
})
