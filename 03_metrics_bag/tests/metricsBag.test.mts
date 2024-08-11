import { validateHeaderName } from 'http'
import { MetricsBag } from '../src/metricsBag'
import { MetricCounter } from '../src/metricCounter'
import { MetricTimestamp } from '../src/metricTimestamp'

describe('MetricsBag', () => {
  afterEach(() => {
    //let testName = expect.getState().currentTestName
    //console.log(`afterEach ${testName}`)
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

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

  it('duplicate names cause exception', () => {
    // ARRANGE
    const mb = new MetricsBag()

    // ACT
    const counter1 = new MetricCounter()
    const counter2 = new MetricCounter()
    mb.addMetric('myCounter1', counter1)

    // ASSERT
    expect(() => {
      mb.addMetric('myCounter1', counter2)
    }).toThrow(Error)
  })

  it('can store different types of metrics', () => {
    const mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    // ARRANGE
    const mb = new MetricsBag()

    // ACT
    const counter1 = new MetricCounter()
    counter1.increment()
    const ts1 = new MetricTimestamp(mockTimestamp - 0, false)
    const ts2 = new MetricTimestamp(mockTimestamp - 1000, false)
    mb.addMetric('myCounter1', counter1)
    mb.addMetric('myTimestamp1', ts1)
    mb.addMetric('myTimestamp2', ts2)
    const value1 = mb.getMetric('myCounter1')
    const value2 = mb.getMetric('myTimestamp1')
    const value3 = mb.getMetric('myTimestamp2')

    // ASSERT
    expect(value1).toBeInstanceOf(MetricCounter)
    expect((value1 as MetricCounter)?.getCount()).toBe(1)

    expect(value2).toBeInstanceOf(MetricTimestamp)
    expect((value2 as MetricTimestamp)?.getDelta()).toBe(0)

    expect(value3).toBeInstanceOf(MetricTimestamp)
    expect((value3 as MetricTimestamp)?.getDelta()).toBe(1000)
  })

  it('returns an object with names and values', () => {
    // ARRANGE
    const mb = new MetricsBag()

    // ACT
    const counter1 = new MetricCounter(10)
    const counter2 = new MetricCounter(12)
    mb.addMetric('myCounter1', counter1)
    mb.addMetric('myCounter2', counter2)
    const value1 = mb.getMetric('myCounter1')
    const value2 = mb.getMetric('myCounter2')

    const metrics = mb.getMetrics()

    // ASSERT
    expect(metrics).toBeDefined()
    expect(metrics.size).toBe(2)

    const value1Count = metrics.get('myCounter1')
    expect(value1Count).toBeDefined()
    expect(value1Count).toBe(10)

    const value2Count = metrics.get('myCounter2')
    expect(value2Count).toBeDefined()
    expect(value2Count).toBe(12)
  })

  it('returns a filtered object with names and values', () => {
    // ARRANGE
    const mb = new MetricsBag()

    // ACT
    const counter1 = new MetricCounter(10)
    const counter2 = new MetricCounter(12)
    mb.addMetric('myCounter1', counter1)
    mb.addMetric('myCounter2', counter2)
    const value1 = mb.getMetric('myCounter1')
    const value2 = mb.getMetric('myCounter2')

    const metrics = mb.getMetrics(['myCounter1'])

    // ASSERT
    expect(metrics).toBeDefined()
    expect(metrics.size).toBe(1)

    const value1Count = metrics.get('myCounter1')
    expect(value1Count).toBeDefined()
    expect(value1Count).toBe(10)

    const value2Count = metrics.get('myCounter2')
    expect(value2Count).toBeUndefined()
  })
})
