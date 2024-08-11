export class MetricTimestamp {
  private startTimestamp: number
  private endTimestamp: number
  private oneShot: boolean

  constructor(startMark: number, oneShot: boolean) {
    this.startTimestamp = startMark
    this.endTimestamp = -1
    this.oneShot = oneShot
  }

  getStartTimestamp(): number {
    return this.startTimestamp
  }

  getEndTimestamp(): number {
    return this.endTimestamp
  }

  getDelta(): number {
    if (this.endTimestamp === -1 || !this.oneShot) {
      this.endTimestamp = Date.now()
    }
    return this.endTimestamp - this.startTimestamp
  }
}
