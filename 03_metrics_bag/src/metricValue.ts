export class MetricValue {
  private value: number

  constructor(initialValue = 0) {
    this.value = initialValue
  }

  increment(): void {
    this.value++
  }

  decrement(): void {
    this.value--
  }

  setValue(value: number): void {
    this.value = value
  }

  getValue(): number {
    return this.value
  }
}
