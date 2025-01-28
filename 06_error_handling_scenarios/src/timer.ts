// src/timer.ts

export type Invocation = {
  startTime: number
  completionTime: number
  name: string
  id: number
}

export function createTimer(
  callback: (arg0: Invocation[], arg1: number) => void,
  invocationStack: Array<Invocation>,
  timeout: number,
  invocation: number,
  maxInvocations: number = 10,
) {
  setTimeout(() => {
    // bail out if we reached the maximum number of innvocations
    if (invocation >= maxInvocations) {
      return
    }

    callback(invocationStack, invocation)

    // restart the timer
    createTimer(callback, invocationStack, timeout, invocation + 1, maxInvocations)
  }, timeout)
}

export async function createTimerAsync(
  callback: (arg0: Invocation[], arg1: number) => void,
  invocationStack: Array<Invocation>,
  timeout: number,
  innvocation: number,
  maxInvocations: number = 10,
) {
  setTimeout(async () => {
    // bail out if we reached the maximum number of innvocations
    if (innvocation >= maxInvocations) {
      return
    }

    await callback(invocationStack, innvocation)

    // restart the timer
    createTimerAsync(callback, invocationStack, timeout, innvocation + 1, maxInvocations)
  }, timeout)
}
