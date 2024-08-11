import { MetricTimestamp } from '../src/metricTimestamp'

describe('MetricTimestamp', () => {
  afterEach(() => {
    //let testName = expect.getState().currentTestName
    //console.log(`afterEach ${testName}`)
    jest.clearAllMocks()
  })

  it('correctly stores startTimestamp', () => {
    // ARRANGE
    const ts = new MetricTimestamp(1000000000, false)

    // ACT
    // ASSERT
    expect(ts.getStartTimestamp()).toBe(1000000000)
  })

  it('correctly calculates delta', () => {
    // ARRANGE
    const mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const ts = new MetricTimestamp(mockTimestamp - 1000, false)

    // ACT
    // ASSERT
    expect(ts.getDelta()).toBe(1000)
  })

  it('correctly stores endTimestamp', () => {
    // ARRANGE
    const mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const ts = new MetricTimestamp(mockTimestamp - 1000, false)

    // ACT
    ts.getDelta()

    // ASSERT
    expect(ts.getEndTimestamp()).toBe(mockTimestamp)
  })

  it('oneshot false allows setting another mark', () => {
    // ARRANGE
    let mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const ts = new MetricTimestamp(mockTimestamp - 1000, false)

    // ACT
    ts.getDelta()
    mockTimestamp += 10000
    ts.getDelta()
    mockTimestamp += 10000
    ts.getDelta()

    // ASSERT
    expect(ts.getDelta()).toBe(21000)
  })

  it('oneshot true stops setting another mark', () => {
    // ARRANGE
    let mockTimestamp = 1605139200000 // equivalent to 2020-11-12T00:00:00.000Z
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp)

    const ts = new MetricTimestamp(mockTimestamp - 1000, true)

    // ACT
    ts.getDelta()
    mockTimestamp += 10000
    ts.getDelta()
    mockTimestamp += 10000
    ts.getDelta()

    // ASSERT
    expect(ts.getDelta()).toBe(1000)
  })
})
