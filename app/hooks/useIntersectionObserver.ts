import React from 'react'
import { useLatestRef } from './useLatestRef'

export const useIntersectionObserver = <
  RootType extends HTMLElement | null,
  TargetType extends HTMLElement | null,
>(
  root: RootType,
  targets: TargetType[],
  handler: (entries: IntersectionObserverEntry[]) => void,
) => {
  const latestHandlerRef = useLatestRef(handler)

  React.useEffect(() => {
    if (!root) return
    if (!targets.every((target) => target instanceof HTMLElement)) return

    const latestHandler = (entries: IntersectionObserverEntry[]) =>
      latestHandlerRef.current(entries)
    const observer = new IntersectionObserver(latestHandler, { root: root })

    for (const target of targets) {
      observer.observe(target as HTMLElement)
    }
    return () => {
      for (const target of targets) {
        observer.unobserve(target as HTMLElement)
      }
    }
  }, [root, targets, latestHandlerRef])
}
