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
