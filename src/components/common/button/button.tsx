import classNames from 'classnames'

type TButtonProps = {
  variant?: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  children,
  onClick,
  className,
  variant = 'primary',
  disabled = false,
  ...otherProps
}: TButtonProps) {
  return (
    <button
      disabled={disabled}
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
