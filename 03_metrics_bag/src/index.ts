import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { MetricsBag, MetricCounter, MetricTimestamp } from './metricsBag.js'

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  const counter = new MetricCounter()
  const timestamp = new MetricTimestamp(Date.now(), true)
  const mb = new MetricsBag()
  mb.addMetric('myCounter', counter)
  mb.addMetric('myTimestamp', timestamp)

  logger.trace('TRACE - level message')
  counter.increment()
  logger.debug('DEBUG - level message')
  counter.increment()
  logger.info('INFO - level message')
  counter.increment()
  logger.warn('WARN - level message')
  counter.increment()
  logger.error('ERROR - level message')
  counter.increment()
  logger.fatal('FATAL - level message')
  counter.increment()
  logger.info({ node_env: process.env.NODE_ENV })
  counter.increment()
  logger.info({ 'node.version': process.version })
  counter.increment()

  await sleep(1000)

  timestamp.mark()

  const metrics = mb.getMetrics()
  const metricsFromEntries = Object.fromEntries(metrics)
  const metricsJson = JSON.stringify(metricsFromEntries)
  logger.info(metricsJson)
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
  string: ['ssmName'],
  boolean: ['verbose', 'ssmRead', 'ssmWrite', 'throwError'],
  default: { verbose: true, throwError: false, ssmRead: false, ssmWrite: false, ssmName: 'testssmdocument' },
})

try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
