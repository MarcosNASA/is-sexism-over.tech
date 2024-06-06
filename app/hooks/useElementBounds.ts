import React from 'react'

export const useElementBounds = <Element extends HTMLElement>() => {
  const [element, setElement] = React.useState<Element | null>(null)
  const [bounds, setBounds] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    if (!element) return

    const mutationObserver = new MutationObserver(() => {
      setBounds(element.getBoundingClientRect())
    })
    mutationObserver.observe(element, {
      attributes: true,
      subtree: true,
    })
    return () => {
      mutationObserver.disconnect()
    }
  }, [element])

  React.useEffect(() => {
    if (!element) return

    const resizeObserver = new ResizeObserver(() => {
      setBounds(element.getBoundingClientRect())
    })
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  }, [element])

  return { ref: setElement, element, bounds }
}
