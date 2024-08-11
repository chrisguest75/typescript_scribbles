/**
 * MetricCounter class
 * @class MetricCounter
 * @constructor
 * @param {number} initialCount - initial count value
 * @method increment - increment the count
 * @method getCount - get the count
 * @returns {void}
 */
export class MetricCounter {
  private count: number

  constructor(initialCount = 0) {
    this.count = initialCount
  }

  increment(): void {
    this.count++
  }

  getCount(): number {
    return this.count
  }
}

export class MetricTimestamp {
  private startTimestamp: number
  private endTimestamp: number
  private oneShot: boolean

  constructor(startMark: number, oneShot: boolean) {
    this.startTimestamp = startMark
    this.endTimestamp = -1
    this.oneShot = oneShot
  }

  mark() {
    if (this.endTimestamp === -1 || !this.oneShot) {
      this.endTimestamp = Date.now()
    }
  }

  getStartTimestamp(): number {
    return this.endTimestamp
  }

  getEndTimestamp(): number {
    return this.endTimestamp
  }

  getDelta(): number {
    return this.endTimestamp - this.startTimestamp
  }
}

type MetricTypes = MetricCounter | MetricTimestamp

export class MetricsBag {
  private metrics: Map<string, MetricTypes>

  constructor() {
    this.metrics = new Map<string, MetricTypes>()
  }

  addMetric(key: string, value: MetricTypes): void {
    if (this.metrics.has(key)) {
      throw new Error('Duplicate metric name')
    }
    this.metrics.set(key, value)
  }

  getMetric(key: string): MetricTypes | undefined {
    return this.metrics.get(key)
  }

  getMetrics(): Map<string, number> {
    // create a new object using string as name and MetricTypes as value
    const metrics: Map<string, number> = new Map<string, number>()
    this.metrics.forEach((value, key) => {
      if (value instanceof MetricCounter) {
        metrics.set(key, value.getCount())
        return
      }
      if (value instanceof MetricTimestamp) {
        metrics.set(key, value.getDelta())
        return
      }
    })

    return metrics
  }
}
