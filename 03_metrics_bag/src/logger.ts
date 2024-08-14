import pino from 'pino'

/**
 * logger
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
})
