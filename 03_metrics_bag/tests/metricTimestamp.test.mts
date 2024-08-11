import { MetricTimestamp } from '../src/metricsBag'

describe('MetricTimestamp', () => {
  it('correctly calculates detla', () => {
    // ARRANGE
    const mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const ts = new MetricTimestamp(mockTimestamp - 1000, false)

    // ACT
    ts.mark()

    // ASSERT
    expect(ts.getDelta()).toBe(1000)
  })

  it('oneshot false allows setting another mark', () => {
    // ARRANGE
    let mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const ts = new MetricTimestamp(mockTimestamp - 1000, false)

    // ACT
    ts.mark()
    mockTimestamp += 10000
    ts.mark()
    mockTimestamp += 10000
    ts.mark()

    // ASSERT
    expect(ts.getDelta()).toBe(21000)
  })

  it('oneshot true stops setting another mark', () => {
    // ARRANGE
    let mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const ts = new MetricTimestamp(mockTimestamp - 1000, true)

    // ACT
    ts.mark()
    mockTimestamp += 10000
    ts.mark()
    mockTimestamp += 10000
    ts.mark()

    // ASSERT
    expect(ts.getDelta()).toBe(1000)
  })
})
