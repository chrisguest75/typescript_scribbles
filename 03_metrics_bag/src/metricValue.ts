export const MetricValueTypes = {
  NORMAL: 0,
  MAX: 1,
  MIN: 2,
}

export class MetricValue {
  private value: number
  private metricType: number

  constructor(initialValue = 0, metricType = MetricValueTypes.NORMAL) {
    this.value = initialValue
    this.metricType = metricType
  }

  increment(): void {
    switch (this.metricType) {
      case MetricValueTypes.MAX:
        this.value = Math.max(this.value, this.value + 1)
        return
      case MetricValueTypes.MIN:
        this.value = Math.min(this.value, this.value + 1)
        return
    }

    this.value++
  }

  decrement(): void {
    switch (this.metricType) {
      case MetricValueTypes.MAX:
        this.value = Math.max(this.value, this.value - 1)
        return
      case MetricValueTypes.MIN:
        this.value = Math.min(this.value, this.value - 1)
        return
    }

    this.value--
  }

  setValue(value: number): void {
    switch (this.metricType) {
      case MetricValueTypes.MAX:
        this.value = Math.max(this.value, value)
        return
      case MetricValueTypes.MIN:
        this.value = Math.min(this.value, value)
        return
    }

    this.value = value
  }

  getValue(): number {
    return this.value
  }
}
