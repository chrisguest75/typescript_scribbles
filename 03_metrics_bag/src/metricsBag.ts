import { MetricCounter } from './metricCounter'
import { MetricTimestamp } from './metricTimestamp'
import { MetricValue } from './metricValue'

type MetricTypes = MetricCounter | MetricTimestamp | MetricValue

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
      if (value instanceof MetricValue) {
        metrics.set(key, value.getValue())
        return
      }
    })

    return metrics
  }
}
