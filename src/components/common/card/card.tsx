import classNames from 'classnames'

export function Card({
  children,
  className,
  ...otherProps
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={classNames('rounded-xl bg-white px-4 py-8', className)}
      {...otherProps}
    >
      {children}
    </div>
  )
}
