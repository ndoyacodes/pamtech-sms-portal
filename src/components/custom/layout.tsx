import * as React from 'react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

const LayoutContext = React.createContext<{
  offset: number
  fixed: boolean
} | null>(null)

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
  hideVerificationBanner?: boolean
}

const Layout = ({
  className,
  fixed = false,
  hideVerificationBanner = false,
  children,
  ...props
}: LayoutProps) => {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState(0)

  const [isVerified] = React.useState(false) // hardcoded NOT verified
  const [showBanner, setShowBanner] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const div = divRef.current
    if (!div) return
    const onScroll = () => setOffset(div.scrollTop)

    div.removeEventListener('scroll', onScroll)
    div.addEventListener('scroll', onScroll, { passive: true })
    return () => div.removeEventListener('scroll', onScroll)
  }, [])

  const headerChildren = React.Children.toArray(children).filter(
    (child: any) => child?.type?.displayName === 'Header'
  )
  const otherChildren = React.Children.toArray(children).filter(
    (child: any) => child?.type?.displayName !== 'Header'
  )

  return (
    <LayoutContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout="layout"
        className={cn('h-full overflow-auto', fixed && 'flex flex-col', className)}
        {...props}
      >
        {headerChildren}

        {/* Show banner if NOT hidden and user NOT verified */}
       {!hideVerificationBanner && !isVerified && showBanner && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 flex items-center bg-red-600 text-white px-4 py-2 rounded shadow-lg min-w-[320px] max-w-[90vw]">
          <span className="flex-1 text-sm text-center">
            Your account is not verified. Please upload the required documents to complete verification.
          </span>
          <button
            className="ml-4 p-1 rounded hover:bg-red-700 transition"
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="ml-2 bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-100 transition text-xs font-semibold"
            onClick={() => {
              setShowBanner(false);
              navigate('/verification');
            }}
            type="button"
          >
            Verify Now
          </button>
        </div>
      )}

        {otherChildren}
      </div>
    </LayoutContext.Provider>
  )
}
Layout.displayName = 'Layout'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, sticky, ...props }, ref) => {
    const contextVal = React.useContext(LayoutContext)
    if (contextVal === null) {
      throw new Error(`Layout.Header must be used within ${Layout.displayName}.`)
    }

    return (
      <div
        ref={ref}
        data-layout="header"
        className={cn(
          `flex h-[var(--header-height)] items-center gap-4 bg-background p-4 md:px-8`,
          contextVal.offset > 10 && sticky ? 'shadow' : 'shadow-none',
          contextVal.fixed && 'flex-none',
          sticky && 'sticky top-0',
          className
        )}
        {...props}
      />
    )
  }
)
Header.displayName = 'Header'

const Body = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const contextVal = React.useContext(LayoutContext)
  if (contextVal === null) {
    throw new Error(`Layout.Body must be used within ${Layout.displayName}.`)
  }

  return (
    <div
      ref={ref}
      data-layout="body"
      className={cn(
        'px-4 py-6 md:overflow-hidden md:px-8',
        contextVal && contextVal.fixed && 'flex-1',
        className
      )}
      {...props}
    />
  )
})
Body.displayName = 'Body'

Layout.Header = Header
Layout.Body = Body

export { Layout }
