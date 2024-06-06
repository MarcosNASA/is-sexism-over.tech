export const cn = <ClassName>(...args: ClassName[]) =>
  args.filter(Boolean).join(' ')

export const Styles = {
  cn,
}
