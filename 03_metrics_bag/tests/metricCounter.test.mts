import { MetricCounter } from '../src/metricsBag'

describe('MetricCounter', () => {
  it('can be incremented', () => {
    // ARRANGE
    const counter = new MetricCounter()

    // ACT
    counter.increment()

    // ASSERT
    expect(counter?.getCount()).toBe(1)
  })
})
