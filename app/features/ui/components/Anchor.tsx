import { Styles } from '../domain'

export const Anchor = (
  props: {
    children: React.ReactNode
    href: string
  } & React.HTMLAttributes<HTMLAnchorElement>,
) => {
  const { children, href, className, ...rest } = props
  return (
    <a
      className={Styles.cn(
        'text-blue-300 hover:text-blue-400 visited:text-pink-300 hover:visited:text-pink-400 underline',
        'transition-colors duration-500 ease-in-out',
        className,
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  )
}
