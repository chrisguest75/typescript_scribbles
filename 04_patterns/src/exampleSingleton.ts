export class ExampleSingleton {
  // Private static instance of the class
  private static instance: ExampleSingleton

  // Private constructor to prevent instantiation
  private constructor() {
    // Initialization code here
  }

  private state: number = 0

  // Public static method to get the instance of the class
  public static getInstance(): ExampleSingleton {
    if (!ExampleSingleton.instance) {
      ExampleSingleton.instance = new ExampleSingleton()
    }
    return ExampleSingleton.instance
  }

  public setValue(state: number): void {
    this.state = state
  }

  public getValue(): number {
    return this.state
  }
}
