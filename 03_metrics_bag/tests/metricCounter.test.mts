import { MetricCounter } from '../src/metricsBag'

describe('MetricCounter', () => {
  it('can have an initial value', () => {
    // ARRANGE
    const counter = new MetricCounter(10)

    // ACT
    counter.increment()

    // ASSERT
    expect(counter?.getCount()).toBe(11)
  })

  it('can be incremented', () => {
    // ARRANGE
    const counter = new MetricCounter()

    // ACT
    counter.increment()

    // ASSERT
    expect(counter?.getCount()).toBe(1)
  })
})
