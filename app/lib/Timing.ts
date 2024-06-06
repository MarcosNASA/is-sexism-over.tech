const debounce = <FunctionToDebounce extends (...args: any[]) => any>(
  fn: FunctionToDebounce,
  delay: number,
): FunctionToDebounce => {
  let timeout: number | null = null
  return ((...args: Parameters<FunctionToDebounce>) => {
    if (timeout) window.clearTimeout(timeout)
    timeout = window.setTimeout(() => fn(...args), delay)
  }) as FunctionToDebounce
}

const throttle = <FunctionToThrottle extends (...args: any[]) => any>(
  fn: FunctionToThrottle,
  delay: number,
): FunctionToThrottle => {
  let timeout: number | null = null
  return ((...args: Parameters<FunctionToThrottle>) => {
    if (!timeout) {
      fn(...args)
      timeout = window.setTimeout(() => {
        timeout = null
      }, delay)
    }
  }) as FunctionToThrottle
}

const delay =
  (miliseconds: number) =>
  <T>(data: T) =>
    new Promise<T>((resolve) => setTimeout(() => resolve(data), miliseconds))

export const Timing = {
  delay,
  debounce,
  throttle,
}
