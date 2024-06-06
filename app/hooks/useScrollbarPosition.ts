import React from 'react'

export const useScrollbarPosition = <ScrollableElement extends HTMLElement>(
  element: ScrollableElement | null,
) => {
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  })

  React.useEffect(() => {
    if (!element) return

    const handleScrollUpdate = () => {
      const { scrollLeft, scrollTop } = element
      setPosition({ x: scrollLeft, y: scrollTop })
    }

    element.addEventListener('scroll', handleScrollUpdate)

    return () => {
      element.removeEventListener('scroll', handleScrollUpdate)
    }
  }, [element])

  return position
}
