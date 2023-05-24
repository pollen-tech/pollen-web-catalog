import classNames from 'classnames'

type TButtonProps = {
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  children,
  onClick,
  className,
  variant = 'primary',
  ...otherProps
}: TButtonProps) {
  return (
    <button
      className={classNames(
        'rounded-md px-4 py-2 text-center',
        {
          'bg-pollen-purple text-white': variant === 'primary',
          'border border-solid border-gray-300 bg-white text-gray-900':
            variant === 'secondary',
        },
        className
      )}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  )
}
