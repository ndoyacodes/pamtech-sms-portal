import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { IconLoader2 } from '@tabler/icons-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
       default:
        'bg-gradient-to-r from-[var(--brand-color-TOP)] to-[var(--brand-color-BOTTOM)] text-white shadow hover:opacity-90',


        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-700',

        outline:
          'border border-input bg-background shadow-sm hover:bg-[var(--brand-color-TOP)] hover:text-[var(--button-text-color)]',

        secondary:
          'bg-gradient-to-r from-[var(--brand-color-TOP)] to-[var(--brand-color-BOTTOM)] text-white shadow-sm hover:opacity-90',
        ghost:
          'hover:bg-[var(--brand-color-BOTTOM)] hover:text-white',

        link: 'text-[var(--brand-color-BOTTOM)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)



interface ButtonPropsBase
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

type ButtonProps = ButtonPropsBase &
  (
    | { asChild: true }
    | {
        asChild?: false
        loading?: boolean
        leftSection?: JSX.Element
        rightSection?: JSX.Element
      }
  )

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    if (props.asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    const {
      loading = false,
      leftSection,
      rightSection,
      disabled,
      ...otherProps
    } = props

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        ref={ref}
        {...otherProps}
      >
        {((leftSection && loading) ||
          (!leftSection && !rightSection && loading)) && (
          <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
        )}
        {!loading && leftSection && <div className='mr-2'>{leftSection}</div>}
        {children}
        {!loading && rightSection && <div className='ml-2'>{rightSection}</div>}
        {rightSection && loading && (
          <IconLoader2 className='ml-2 h-4 w-4 animate-spin' />
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
