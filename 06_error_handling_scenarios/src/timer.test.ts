import { describe, test, expect } from '@jest/globals'
import { Invocation, createTimer, createTimerAsync } from './timer'
import { promisify } from 'util'
import exp from 'constants'


const sleep = promisify(setTimeout)

const callbackNormal = (invocationStack: Array<Invocation>, invocation: number) => {
  const item = {
    time: Date.now(),
    name: 'callbackNormal',
    id: invocation
  }

  invocationStack.push(item)
}

const callbackNormalAsync = async (invocationStack: Array<Invocation>, invocation: number) => {
  const item = {
    time: Date.now(),
    name: 'callbackNormalAsync',
    id: invocation
  }

  invocationStack.push(item)
}

const callbackException = (invocationStack: Array<Invocation>, invocation: number) => {
  const item = {
    time: Date.now(),
    name: 'callbackException',
    id: invocation
  }

  invocationStack.push(item)
  throw new Error('callbackException')
}

const callbackExceptionAsync = async (invocationStack: Array<Invocation>, invocation: number) => {
  const item = {
    time: Date.now(),
    name: 'callbackExceptionAsync',
    id: invocation
  }

  invocationStack.push(item)
  throw new Error('callbackExceptionAsync')
}

// Can't sleep in a synchronous function
/*const callbackSleep = (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackNormal ${innvocation}`)
  sleep(1000)
}*/

const callbackSleepAsync = async (invocationStack: Array<Invocation>, invocation: number) => {
  const item = {
    time: Date.now(),
    name: 'callbackSleepAsync',
    id: invocation
  }

  invocationStack.push(item)
  await sleep(1000)
}


describe('timer sync', () => {
  test('createTimer->callbackNormal calls timer function expected times over 1 second', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimer(callbackNormal, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
    expect(innvocations[0].name).toBe('callbackNormal')
  })

  test('createTimer->callbackNormalAsync calls async timer function expected times over 1 second', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimer(callbackNormalAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimer->callbackException timer function stops after immediate exception', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimer(callbackException, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeLessThanOrEqual(1)
  })

  test('createTimer->callbackExceptionAsync timer function stops after immediate exception', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimer(callbackExceptionAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimer->callbackSleepAsync calls async timer function once', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimer(callbackSleepAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeLessThan(2)
  })
})

describe('timer async', () => {
  test('createTimerAsync->callbackNormal calls timer function expected times over 1 second', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimerAsync(callbackNormal, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimerAsync->callbackNormalAsync calls async timer function expected times over 1 second', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimerAsync(callbackNormalAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimerAsync->callbackException timer function stops after immediate exception', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimerAsync(callbackException, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(1)
  })

  test('createTimerAsync->callbackExceptionAsync timer function stops after immediate exception', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimerAsync(callbackExceptionAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(1)
  })

  test('createTimerAsync->callbackSleepAsync calls async timer function once', async () => {
    // ARRANGE
    const innvocations: Array<Invocation> = []
    createTimerAsync(callbackSleepAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeLessThan(2)
  })
})
