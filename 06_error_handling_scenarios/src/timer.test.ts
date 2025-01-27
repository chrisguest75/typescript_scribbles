import { describe, test, expect } from '@jest/globals'
import { createTimer } from './timer'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

const callbackNormal = (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackNormal ${innvocation}`)
}

const callbackNormalAsync = async (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackNormalAsync ${innvocation}`)
}

const callbackException = (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackException ${innvocation}`)
  throw new Error('callbackException')
}

const callbackExceptionAsync = async (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackExceptionAsync ${innvocation}`)
  throw new Error('callbackException')
}

/*const callbackSleep = (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackNormal ${innvocation}`)
  sleep(1000)
}*/

const callbackSleepAsync = async (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackNormalAsync ${innvocation}`)
  await sleep(1000)
}


describe('timer', () => {
  test('calls timer function', async () => {
    // ARRANGE
    const innvocations: Array<string> = []
    createTimer(callbackNormal, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
  })

  test('calls async timer function', async () => {
    // ARRANGE
    const innvocations: Array<string> = []
    createTimer(callbackNormalAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
  })

  test('timer function stops after immediate exception', async () => {
    // ARRANGE
    const innvocations: Array<string> = []
    createTimer(callbackException, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(1)
  })

  test('async timer function stops after immediate exception', async () => {
    // ARRANGE
    const innvocations: Array<string> = []
    createTimer(callbackExceptionAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeGreaterThanOrEqual(8)
  })

  test('calls async timer function once', async () => {
    // ARRANGE
    const innvocations: Array<string> = []
    createTimer(callbackSleepAsync, innvocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(innvocations.length).toBeLessThan(2)
  })


})

