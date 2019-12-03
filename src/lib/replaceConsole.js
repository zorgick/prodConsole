import defaultApplier from '../utils/applier'

/**
 * Wraps console into Proxy, that can disable its methods
 * @param {Object} opts Options for configuring the execution of the function
 * @param {boolean} opts.monitor Allows you to display a message informing
 * that the console has been turned off
 * @returns {object} Methods that can change the behavior of the Proxy
 */

const replaceConsole = ({ monitor }) => {
  let production = false

  const envObserver = {
    checkProd: () => production,
    setProd: prod => (production = prod)
  }

  if (window) {
    // @ts-ignore
    window.console = new Proxy(window.console, {
      get (target, propKey) {
        if (envObserver.checkProd()) {
          return () =>
            monitor ? 'Console methods are disabled in production mode' : ' '
        }

        return defaultApplier(target, propKey)
      }
    })
  }

  return envObserver
}

export default replaceConsole
