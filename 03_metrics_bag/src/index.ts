import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { MetricsBag } from './metricsBag.js'
import { MetricCounter } from './metricCounter.js'
import { MetricTimestamp } from './metricTimestamp.js'
import { MetricValue, MetricValueTypes } from './metricValue.js'

/**
 * Sleep function
 * @param ms period to sleep for
 * @returns A promise to be awaited
 */
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * MetricsBag example code
 * @param args The parsed command line args
 * @mermaid Make TypeDoc easy to use with mermaid.js
 * graph TB
 *   mermaid.js --> TypeDoc;
 */
export async function main(args: minimist.ParsedArgs) {
  const mb = MetricsBag.create([
    { name: 'loopCounter', metric: new MetricCounter(0) },
    { name: 'startTimestamp', metric: new MetricTimestamp(Date.now(), true) },
    { name: 'endTimestamp', metric: new MetricTimestamp(Date.now(), false) },
    { name: 'lastSleep', metric: new MetricValue(0, MetricValueTypes.NORMAL) },
    { name: 'minSleep', metric: new MetricValue(10000, MetricValueTypes.MIN) },
    { name: 'maxSleep', metric: new MetricValue(0, MetricValueTypes.MAX) },
  ])

  const loopCounter: MetricCounter = mb.getMetric('loopCounter') as MetricCounter
  const startTimestamp: MetricTimestamp = mb.getMetric('startTimestamp') as MetricTimestamp
  const lastTimestamp: MetricTimestamp = mb.getMetric('endTimestamp') as MetricTimestamp
  const lastSleep: MetricValue = mb.getMetric('lastSleep') as MetricValue
  const minSleep: MetricValue = mb.getMetric('minSleep') as MetricValue
  const maxSleep: MetricValue = mb.getMetric('maxSleep') as MetricValue

  logger.trace('TRACE - level message')
  logger.debug('DEBUG - level message')
  logger.info('INFO - level message')
  logger.warn('WARN - level message')
  logger.error('ERROR - level message')
  logger.fatal('FATAL - level message')
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  const time = parseInt(args.time)
  startTimestamp.getDelta()
  while (lastTimestamp.getDelta() < time) {
    loopCounter.increment()
    const sleepTime = Math.floor(Math.random() * 1000)
    lastSleep.setValue(sleepTime)
    minSleep.setValue(sleepTime)
    maxSleep.setValue(sleepTime)
    await sleep(sleepTime)

    const metrics = mb.getMetrics()
    const metricsFromEntries = Object.fromEntries(metrics)
    logger.info(metricsFromEntries)
    const metricsJson = JSON.stringify(metricsFromEntries)
    logger.info(metricsJson)
  }

  /*if (args['throwError']) {
    throw new Error("I'm an error")
  }*/
}

process.on('exit', async () => {
  logger.warn('exit signal received')
  //process.exit(1)
})

process.on('uncaughtException', async (error: Error) => {
  logger.error(error)
  // for nice printing
  console.log(error)
  process.exit(1)
})

process.on('unhandledRejection', async (reason, promise) => {
  logger.error({
    promise: promise,
    reason: reason,
    msg: 'Unhandled Rejection',
  })
  console.log(reason)
  process.exit(1)
})

// load config
dotenv.config()
logger.info(`Pino:${logger.version}`)
const args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ['time'],
  boolean: ['verbose'],
  default: { verbose: true, time: '10000' },
})

try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
