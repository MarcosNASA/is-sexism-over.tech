export const Functional = {
  map:
    <ItemType, MappedType>(mapper: (item: ItemType) => MappedType) =>
    (array: ItemType[]) =>
      array.map(mapper),
  pluck:
    <T extends object, Key extends keyof T>(key: Key) =>
    (item: T) =>
      item[key],
  trace:
    (label: string) =>
    <T>(value: T) => {
      console.log(`${label}:`, value)
      return value
    },
}
