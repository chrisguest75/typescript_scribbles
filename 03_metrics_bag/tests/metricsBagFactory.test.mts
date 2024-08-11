import { validateHeaderName } from 'http'
import { MetricsBag } from '../src/metricsBag'
import { MetricCounter } from '../src/metricCounter'
import { MetricTimestamp } from '../src/metricTimestamp'
import { MetricValue } from '../src/metricValue'

describe('MetricsBag', () => {
  afterEach(() => {
    //let testName = expect.getState().currentTestName
    //console.log(`afterEach ${testName}`)
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('create can be used to construct object with many metrics', () => {
    // ARRANGE
    const mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const start = mockTimestamp - 10000
    const mb = MetricsBag.create([
      { name: 'myCounter1', metric: new MetricCounter() },
      { name: 'myCounter2', metric: new MetricCounter() },
      { name: 'myCounter3', metric: new MetricCounter() },
      { name: 'myCounter4', metric: new MetricCounter() },
      { name: 'myCounter5', metric: new MetricCounter() },
      { name: 'myTimestamp1', metric: new MetricTimestamp(start, false) },
      { name: 'myTimestamp2', metric: new MetricTimestamp(start, true) },
      { name: 'myValue1', metric: new MetricValue(100) },
    ])

    // ACT
    const value1 = mb.getMetric('myCounter1')
    const value2 = mb.getMetric('myTimestamp1')
    const value3 = mb.getMetric('myTimestamp2')
    const value4 = mb.getMetric('myValue1')

    // ASSERT
    expect(value1).toBeInstanceOf(MetricCounter)
    expect((value1 as MetricCounter)?.getCount()).toBe(0)

    expect(value2).toBeInstanceOf(MetricTimestamp)
    expect((value2 as MetricTimestamp)?.getDelta()).toBe(10000)

    expect(value3).toBeInstanceOf(MetricTimestamp)
    expect((value3 as MetricTimestamp)?.getDelta()).toBe(10000)

    expect(value4).toBeInstanceOf(MetricValue)
    expect((value4 as MetricValue)?.getValue()).toBe(100)
  })
})
