import { MetricValue, MetricValueTypes } from '../src/metricValue'

describe('MetricValue type=Normal', () => {
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

describe('MetricValue type=Min', () => {
  it('if setting value higher than an existing value it does not modify it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MIN)

    // ACT
    counter.setValue(100)

    // ASSERT
    expect(counter?.getValue()).toBe(10)
  })

  it('if setting value lower than an existing value it modifies it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MIN)

    // ACT
    counter.setValue(1)

    // ASSERT
    expect(counter?.getValue()).toBe(1)
  })

  it('if incrementing value higher than an existing value it does not modify it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MIN)

    // ACT
    counter.increment()

    // ASSERT
    expect(counter?.getValue()).toBe(10)
  })

  it('if decrementing value lower than an existing value it modifies it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MIN)

    // ACT
    counter.decrement()

    // ASSERT
    expect(counter?.getValue()).toBe(9)
  })
})

describe('MetricValue type=Max', () => {
  it('if setting value higher than an existing value it modifies it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MAX)

    // ACT
    counter.setValue(100)

    // ASSERT
    expect(counter?.getValue()).toBe(100)
  })

  it('if setting value lower than an existing value it does not modify it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MAX)

    // ACT
    counter.setValue(1)

    // ASSERT
    expect(counter?.getValue()).toBe(10)
  })

  it('if incrementing value higher than an existing value it modifies it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MAX)

    // ACT
    counter.increment()

    // ASSERT
    expect(counter?.getValue()).toBe(11)
  })

  it('if decrementing value lower than an existing value it does not modify it', () => {
    // ARRANGE
    const counter = new MetricValue(10, MetricValueTypes.MAX)

    // ACT
    counter.decrement()

    // ASSERT
    expect(counter?.getValue()).toBe(10)
  })
})
