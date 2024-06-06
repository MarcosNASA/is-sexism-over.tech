import * as React from 'react'

export type Descendant = {
  element: React.RefObject<HTMLElement>
  index: number
}

export const createDescendants = <DescendantType extends Descendant>() => {
  const Context = React.createContext<
    | [DescendantType[], React.Dispatch<React.SetStateAction<DescendantType[]>>]
    | null
  >(null)
  const useDescendants = () => {
    const context = React.useContext(Context)
    if (context === null) throw new Error('Context not found')
    return context
  }
  return {
    withContext:
      <PropsType extends object>(Component: React.ComponentType<PropsType>) =>
      (props: PropsType) => (
        <Context.Provider value={React.useState<DescendantType[]>([])}>
          <Component {...props} />
        </Context.Provider>
      ),
    useDescedants: () => {
      const [descendants] = useDescendants()
      return descendants
    },
    useDescendant: ({
      descendant,
      index,
    }: {
      descendant: DescendantType
      index?: number
    }) =>
      useComponentSelfRegistration<DescendantType>({
        descendant,
        useContext: useDescendants,
        index,
      }),
  }
}

const useComponentSelfRegistration = <DescendantType extends Descendant>({
  descendant,
  useContext,
  index: customIndex,
}: {
  descendant: DescendantType
  useContext: () => [
    DescendantType[],
    React.Dispatch<React.SetStateAction<DescendantType[]>>,
  ]
  index?: number
}) => {
  const [registeredComponents, setRegisteredComponents] = useContext()

  const naturalIndex = registeredComponents.findIndex((registeredComponent) => {
    return descendant.element === registeredComponent.element
  })
  const index = customIndex ?? naturalIndex

  React.useEffect(() => {
    const { element } = descendant
    const currentElement = element.current
    if (!currentElement) return

    setRegisteredComponents((previousRegisteredComponents) => {
      const isRegistered = previousRegisteredComponents.some(
        (registeredComponent) =>
          descendant.element === registeredComponent.element,
      )
      if (isRegistered) return previousRegisteredComponents

      return [
        ...previousRegisteredComponents,
        {
          ...descendant,
          index,
        },
      ]
    })

    return () => {
      setRegisteredComponents((previousRegisteredComponents) =>
        previousRegisteredComponents.filter(
          (registeredComponent) => registeredComponent.element === element,
        ),
      )
    }
  }, [
    descendant,
    index,
    setRegisteredComponents,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(descendant),
  ])

  return index
}
