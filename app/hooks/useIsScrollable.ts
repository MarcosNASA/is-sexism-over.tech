import React from 'react'
import { useElementBounds } from './useElementBounds'

export const useIsScrollable = <ScrollableElement extends HTMLElement>({
  direction = 'all',
}: {
  direction?: 'vertical' | 'horizontal' | 'all'
} = {}) => {
  const { ref, element } = useElementBounds<ScrollableElement>()
  const [isScrollable, setIsScrollable] = React.useState(false)

  React.useEffect(() => {
    if (!element) return
    const isXScrollable = element.scrollHeight > element.clientHeight
    const isYScrollable = element.scrollWidth > element.clientWidth
    if (direction === 'all') {
      setIsScrollable(isXScrollable || isYScrollable)
    }
    if (direction === 'vertical') {
      setIsScrollable(isXScrollable)
    }
    if (direction === 'horizontal') {
      setIsScrollable(isYScrollable)
    }
  }, [element, direction])

  return { ref, element, isScrollable }
}
