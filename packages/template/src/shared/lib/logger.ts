import plslog from 'plslog'

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none'

const defaultLevel: LogLevel = import.meta.env.DEV ? 'debug' : 'info'
const level = (import.meta.env.VITE_LOG_LEVEL as LogLevel | undefined) ?? defaultLevel

plslog.configure({
  level,
  maxDepth: 10,
  dedup: {
    enabled: true,
    flushInterval: 2000,
  },
})

/**
 * Get a logger instance. Use with optional namespace or options.
 *
 * @example
 * const log = logger('app:api')
 * log.debug('request', { url })
 * log.info('response', data)
 *
 * @example
 * const log = logger({ namespace: 'auth', level: 'debug' })
 */
export const logger = plslog

export default logger
