// src/timer.ts

export function createTimer(callback: (arg0: string[], arg1: number) => void, innvocationStack: Array<string>, timeout: number, innvocation: number, maxInnvocations: number = 10) {
  setTimeout(() => {
    // bail out if we reached the maximum number of innvocations
    if (innvocation >= maxInnvocations) {
      return
    }

    callback(innvocationStack, innvocation)

    // restart the timer
    createTimer(callback, innvocationStack, timeout, innvocation + 1, maxInnvocations)
  },
    timeout)
}

