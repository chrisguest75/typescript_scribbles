export class MetricCounter {
  private count: number

  constructor() {
    this.count = 0
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
    if (this.endTimestamp === -1 && !this.oneShot) {
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
    this.metrics.set(key, value)
  }

  getMetric(key: string): MetricTypes | undefined {
    return this.metrics.get(key)
  }

  getMetrics(): Map<string, MetricTypes> {
    return this.metrics
  }
}
