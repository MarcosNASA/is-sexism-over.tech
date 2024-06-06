import { Styles } from '~/features/ui/domain'

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={Styles.cn('h-full w-full', className)}>{children}</div>
}
