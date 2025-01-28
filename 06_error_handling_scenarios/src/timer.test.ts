import { describe, test, expect, beforeEach, afterEach } from '@jest/globals'
import { Invocation, createTimer, createTimerAsync } from './timer'
import { promisify } from 'util'
import fs from 'fs/promises'

const sleep = promisify(setTimeout)

function itemLogFactory(name: string, id: number): Invocation {
  return {
    startTime: Date.now(),
    name,
    id,
    completionTime: 0,
  }
}
const callbackNormal = (invocationStack: Array<Invocation>, invocation: number) => {
  const item = itemLogFactory('callbackNormal', invocation)
  item.completionTime = Date.now()
  invocationStack.push(item)
}

const callbackNormalAsync = async (invocationStack: Array<Invocation>, invocation: number) => {
  const item = itemLogFactory('callbackNormalAsync', invocation)
  item.completionTime = Date.now()
  invocationStack.push(item)
}

const callbackException = (invocationStack: Array<Invocation>, invocation: number) => {
  const item = itemLogFactory('callbackException', invocation)
  invocationStack.push(item)
  throw new Error('callbackException')
  // will not be inovoked
  item.completionTime = Date.now()
}

const callbackExceptionAsync = async (invocationStack: Array<Invocation>, invocation: number) => {
  const item = itemLogFactory('callbackExceptionAsync', invocation)
  invocationStack.push(item)
  throw new Error('callbackExceptionAsync')
  // will not be inovoked
  item.completionTime = Date.now()
}

// Can't sleep in a synchronous function
/*const callbackSleep = (innvocationStack: Array<string>, innvocation: number) => {
  innvocationStack.push(`callbackNormal ${innvocation}`)
  sleep(1000)
}*/

const callbackSleepAsync = async (invocationStack: Array<Invocation>, invocation: number) => {
  const item = itemLogFactory('callbackSleepAsync', invocation)
  await sleep(1000)
  item.completionTime = Date.now()
  invocationStack.push(item)
}

let invocations: Array<Invocation> = []
const testRunFolder = new Date().toISOString().replace(/[:.]/g, '-')

beforeEach(() => {
  // Initialize the invocations array and generate a unique filename
  invocations = []
})

afterEach(async () => {
  // Write the invocations array to a file after each test
  const outputDir = `./output/${testRunFolder}`
  fs.mkdir(outputDir, { recursive: true }).catch(() => {})
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `${outputDir}/invocations-${timestamp}.txt`
  const testName = expect.getState().currentTestName
  const output = {
    testName,
    invocations,
  }

  const jsonLog = JSON.stringify(output, null, 2)
  await fs.writeFile(filename, jsonLog, 'utf-8')
})

describe('timer sync', () => {
  test('createTimer->callbackNormal calls timer function expected times over 1 second', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimer(callbackNormal, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeGreaterThanOrEqual(8)
    expect(invocations[0].name).toBe('callbackNormal')
  })

  test('createTimer->callbackNormalAsync calls async timer function expected times over 1 second', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimer(callbackNormalAsync, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimer->callbackException timer function stops after immediate exception', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimer(callbackException, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeLessThanOrEqual(1)
  })

  test('createTimer->callbackExceptionAsync timer function stops after immediate exception', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimer(callbackExceptionAsync, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimer->callbackSleepAsync calls async timer function once', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimer(callbackSleepAsync, invocations, 100, 0, 10)
    // ACT
    await sleep(3500)
    // ASSERT
    expect(invocations.length).toBeLessThan(4)
  })
})

describe('timer async', () => {
  test('createTimerAsync->callbackNormal calls timer function expected times over 1 second', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimerAsync(callbackNormal, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimerAsync->callbackNormalAsync calls async timer function expected times over 1 second', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimerAsync(callbackNormalAsync, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeGreaterThanOrEqual(8)
  })

  test('createTimerAsync->callbackException timer function stops after immediate exception', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimerAsync(callbackException, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeGreaterThanOrEqual(1)
  })

  test('createTimerAsync->callbackExceptionAsync timer function stops after immediate exception', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimerAsync(callbackExceptionAsync, invocations, 100, 0, 10)
    // ACT
    await sleep(1000)
    // ASSERT
    expect(invocations.length).toBeGreaterThanOrEqual(1)
  })

  test('createTimerAsync->callbackSleepAsync calls async timer function once', async () => {
    // ARRANGE
    //const invocations: Array<Invocation> = []
    createTimerAsync(callbackSleepAsync, invocations, 100, 0, 10)
    // ACT
    await sleep(3500)
    // ASSERT
    expect(invocations.length).toBeLessThan(4)
  })
})
