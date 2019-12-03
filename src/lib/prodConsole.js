import replaceConsole from './replaceConsole'
import defaultApplier from '../utils/applier'

/**
 * @typedef {Object<string, function>} prodConsole
 * @property {function} switchConsole Activates or disables console in the window object
 * @example
 * prodConsole.switchConsole('on') // Enables console output
 * prodConsole.switchConsole('off') // Disables console output
 */

/**
 * @typedef {Object} opts
 * @property {boolean} [monitor=true] When console output is switched off,
 * this parameter allows you to display a message informing that the console
 * has been turned off
 */

/**
 * Substitutes the global console with Proxy that wraps around the original
 * and allows to switch on/off the console when needed.
 *
 * Additionally sets global variable **\_\_prod_console\_\_** in case
 * you need to disable or enable the console immediately
 * @param {opts} opts
 * @returns {prodConsole} API that lets a user to switch on and off the methods of the console
 * @example
 * const {NODE_ENV} = process.env
 * const prodConsole = consoleProxy()
 * // or
 * const prodConsole = consoleProxy({monitor: false}) // to disable info that the console has been turned off
 * NODE_ENV === 'production' && prodConsole.switchConsole('off')
 * // or
 * NODE_ENV === 'production' && __prod_console__.switchConsole('off')
 *
 * // to enable console output
 *
 * prodConsole.switchConsole('on') || __prod_console__.switchConsole('on')
 */

const consoleProxy = ({ monitor = false } = {}) => {
  /**
   * Call replacer and receive an object, which API can change
   * the behavior of the Proxy
   * @private
   */

  const envObserver = replaceConsole({ monitor })

  /**
   * @private
   * @type {prodConsole}
   */

  const controller = {
    switchConsole: mode => {
      if (mode === 'off') {
        envObserver.setProd(true)
      } else if (mode === 'on') {
        envObserver.setProd(false)
      }
    }
  }

  const proxiedController = new Proxy(controller, {
    get (target, propKey) {
      if (propKey !== 'switchConsole') {
        throw new Error('Invalid API access. Use only "switchConsole" method')
      }

      return defaultApplier(target, propKey)
    }
  })
  // @ts-ignore
  window.__prod_console__ = proxiedController

  return proxiedController
}

export { consoleProxy }
