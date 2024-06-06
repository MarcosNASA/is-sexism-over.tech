import React from 'react'

export const useLatestRef = <Value>(value: Value) => {
  const ref = React.useRef<Value>(value)

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
