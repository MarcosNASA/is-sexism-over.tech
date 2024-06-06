import React from 'react'
import { useLatestRef } from './useLatestRef'

type EventNames = keyof GlobalEventHandlersEventMap

export const useEventListener = <
  SpecificEventTarget extends EventTarget,
  SpecificEventName extends EventNames,
  SpecificEvent extends Event,
>(
  target: SpecificEventTarget,
  eventName: SpecificEventName,
  handler: (event: SpecificEvent) => void,
  options?: boolean | AddEventListenerOptions,
) => {
  const lastHandlerRef = useLatestRef(handler)
  const optionsRef = useLatestRef(options)

  React.useEffect(() => {
    if (!target) return

    const eventHandler = (event: Event) => {
      lastHandlerRef.current(event as SpecificEvent)
    }
    const options = optionsRef.current

    target.addEventListener(eventName, eventHandler, options)
    return () => {
      target.removeEventListener(eventName, eventHandler, options)
    }
  }, [target, eventName, optionsRef, lastHandlerRef])
}
