import React, { useContext, useState } from 'react'
import { Styles } from '~/features/ui/domain'

import { createDescendants } from '~/hooks/useDescendants'
import { useIsScrollable } from '~/hooks/useIsScrollable'
import { useScrollbarPosition } from '~/hooks/useScrollbarPosition'
// import { useIntersectionObserver } from '~/hooks/useIntersectionObserver'

import { Timing } from '~/lib/Timing'

const { withContext, useDescedants, useDescendant } = createDescendants()

const ShowCaseContext = React.createContext<
  | readonly [
      HTMLElement | null,
      React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    ]
  | null
>(null)

const useShowcaseContext = () => {
  const context = useContext(ShowCaseContext)
  if (!context)
    throw new Error(`useShowcaseContext must be used within a Showcase`)
  return context
}

const ShowcaseItems = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [showcasedItem, setShowcasedItem] = useState<HTMLElement | null>(null)
  const debouncedSetShowcasedItem = React.useMemo(
    () =>
      Timing.debounce<React.Dispatch<React.SetStateAction<HTMLElement | null>>>(
        (element) => setShowcasedItem(element),
        350,
      ),
    [setShowcasedItem],
  )

  const descendants = useDescedants()

  const { ref, element, isScrollable } = useIsScrollable({
    direction: 'horizontal',
  })

  const { x: scrollX } = useScrollbarPosition(element)

  // useIntersectionObserver(
  //   element,
  //   descendants.map((descendants) => descendants.element.current),
  //   (entries) => {
  //     if (!isScrollable) return

  //     const intersectedEntries = entries.filter(
  //       (entry) => entry.intersectionRatio === 1,
  //     )
  //     if (intersectedEntries.length === 0) {
  //       debouncedSetShowcasedItem(null)
  //       return
  //     }
  //     const isIntersectedEntryShowcased = intersectedEntries.some(
  //       (entry) => entry.target === showcasedItem,
  //     )
  //     if (isIntersectedEntryShowcased) return
  //     const [intersectedEntry] = intersectedEntries
  //     const intersectedTarget = intersectedEntry.target
  //     if (!(intersectedTarget instanceof HTMLElement)) {
  //       debouncedSetShowcasedItem(null)
  //       return
  //     }
  //     debouncedSetShowcasedItem(intersectedTarget)
  //   },
  // )

  const isAtBeginning = scrollX === 0
  const scrollableWidth =
    (element?.scrollWidth ?? 0) - (element?.offsetWidth ?? 0)
  const isAtEnd = scrollX === scrollableWidth

  const firstShowcasedItem = descendants.at(0)?.element.current ?? null
  const showcasedItemOrDefault = showcasedItem ?? firstShowcasedItem

  return (
    <ShowCaseContext.Provider
      value={React.useMemo(
        () => [showcasedItemOrDefault, debouncedSetShowcasedItem] as const,
        [showcasedItemOrDefault, debouncedSetShowcasedItem],
      )}
    >
      <div
        className={Styles.cn(
          'h-full w-full',
          'grid grid-cols-[15vw_1fr_15vw] grid-rows-[1fr] gap-12',
        )}
      >
        {isScrollable && (
          <div
            className={Styles.cn(
              'pointer-events-none',
              'z-10 row-start-1 row-end-2 col-start-1 col-end-2',
              'from-zinc-900 to-transparent bg-gradient-to-r',
              'transition-opacity duration-500 delay-100 ease-in-out',
              isAtBeginning && 'opacity-0',
              !isAtBeginning && 'opacity-100',
            )}
          />
        )}

        <div
          ref={ref}
          className={Styles.cn(
            'row-start-1 row-end-2 col-start-1 col-end-4',
            'h-full w-full overflow-x-auto',
            className,
          )}
        >
          {children}
        </div>

        {isScrollable && (
          <div
            className={Styles.cn(
              'pointer-events-none',
              'z-10 row-start-1 row-end-2 col-start-3 col-end-4',
              'from-zinc-900 to-transparent bg-gradient-to-l',
              'transition-opacity duration-500 delay-100 ease-in-out',
              isAtEnd && 'opacity-0',
              !isAtEnd && 'opacity-100',
            )}
          />
        )}
      </div>
    </ShowCaseContext.Provider>
  )
}

const ShowcaseItem = ({
  children,
  className = () => '',
}: {
  children:
    | (({
        isShowcased,
        handleShowcase,
      }: {
        isShowcased: boolean
        handleShowcase: () => void
      }) => React.ReactNode)
    | React.ReactNode
  className?: ({ isShowcased }: { isShowcased: boolean }) => string
}) => {
  const [showcasedItem, setShowcasedItem] = useShowcaseContext()

  const showcaseItemRef = React.useRef<HTMLDivElement>(null)
  const descendant = React.useMemo(
    () => ({ element: showcaseItemRef, index: 0 }),
    [],
  )
  useDescendant({
    descendant,
  })

  const isShowcased = showcasedItem === descendant.element.current

  const handleShowcase = () => {
    if (!descendant.element.current) return
    setShowcasedItem(descendant.element.current)
  }

  return (
    <div
      ref={showcaseItemRef}
      className={Styles.cn(className({ isShowcased }))}
    >
      {typeof children === 'function'
        ? children({ isShowcased, handleShowcase })
        : children}
    </div>
  )
}

export const Showcase = Object.assign(withContext(ShowcaseItems), {
  Item: ShowcaseItem,
})
