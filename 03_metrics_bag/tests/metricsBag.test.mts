import { MetricsBag, MetricCounter } from '../src/metricsBag'

describe('MetricsBag', () => {
  it('a stored MetricCounter can be incremented', () => {
    // ARRANGE
    const mb = new MetricsBag()

    // ACT
    const counter = new MetricCounter()
    mb.addMetric('myCounter', counter)
    const value = mb.getMetric('myCounter')

    // ASSERT
    expect(value).toBeInstanceOf(MetricCounter)
    if (value instanceof MetricCounter) {
      value.increment()
      expect(value).toBeDefined()
      expect(value?.getCount()).toBe(1)
    }
  })

  it('can store multiple MetricCounters', () => {
    // ARRANGE
    const mb = new MetricsBag()

    // ACT
    const counter1 = new MetricCounter()
    const counter2 = new MetricCounter()
    mb.addMetric('myCounter1', counter1)
    mb.addMetric('myCounter2', counter2)
    const value1 = mb.getMetric('myCounter1')
    const value2 = mb.getMetric('myCounter2')

    // ASSERT
    expect(value1).toBeInstanceOf(MetricCounter)
    if (value1 instanceof MetricCounter) {
      value1.increment()
      expect(value1).toBeDefined()
      expect(value1.getCount()).toBe(1)
    }

    expect(value2).toBeInstanceOf(MetricCounter)
    if (value2 instanceof MetricCounter) {
      value2.increment()
      expect(value2).toBeDefined()
      expect(value2.getCount()).toBe(1)
    }
  })

  it('returns an object with names and values', () => {
    // ARRANGE
    const mb = new MetricsBag()

    // ACT
    const counter1 = new MetricCounter()
    const counter2 = new MetricCounter()
    mb.addMetric('myCounter1', counter1)
    mb.addMetric('myCounter2', counter2)
    const value1 = mb.getMetric('myCounter1')
    const value2 = mb.getMetric('myCounter2')

    const metrics = mb.getMetrics()

    // ASSERT
    expect(metrics).toBeDefined()
    expect(metrics.size).toBe(2)
  })
})