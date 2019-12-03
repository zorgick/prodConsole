/**
 * Curry function for calling a method with array of arguments
 * @param {object} target Context of the final invocation
 * @param {string|number|symbol} propKey Property of the target object
 * @returns function that calls the method with all passed arguments
 */

const defaultApplier = (target, propKey) => (...args) =>
  Reflect.apply(target[propKey], target, args)

export default defaultApplier
