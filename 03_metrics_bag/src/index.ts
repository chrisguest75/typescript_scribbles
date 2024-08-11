import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { MetricsBag } from './metricsBag.js'
import { MetricCounter } from './metricCounter.js'
import { MetricTimestamp } from './metricTimestamp.js'
import { MetricValue } from './metricValue.js'

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  const loopCounter = new MetricCounter(0)
  const startTimestamp = new MetricTimestamp(Date.now(), true)
  const lastTimestamp = new MetricTimestamp(Date.now(), false)
  const lastSleep = new MetricValue(0)
  const mb = new MetricsBag()
  mb.addMetric('loopCounter', loopCounter)
  mb.addMetric('startTimestamp', startTimestamp)
  mb.addMetric('lastTimestamp', lastTimestamp)
  mb.addMetric('lastSleep', lastSleep)

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
