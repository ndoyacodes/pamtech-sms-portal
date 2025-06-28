import { Link, useNavigate } from 'react-router-dom'
import { IconChevronDown } from '@tabler/icons-react'
import { Button, buttonVariants } from './custom/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { cn } from '@/lib/utils'
import useCheckActiveNav from '@/hooks/use-check-active-nav'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/auth/auth.slice'
import { SideLink } from '@/data/sidelinks'

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  links: SideLink[]
  closeNav: () => void
  onItemClick?: (item: SideLink) => void
}

export default function Nav({
  links,
  isCollapsed,
  className,
  closeNav,
}: NavProps) {
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      )

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      )

    return <NavLink {...rest} key={key} closeNav={closeNav} />
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  )
}

interface NavLinkProps extends SideLink {
  subLink?: boolean
  closeNav: () => void
  isLogout?: boolean
}

function NavLink({
  title,
  icon,
  label,
  href,
  isLogout,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    closeNav()
    if (isLogout) {
      dispatch(logout())
      navigate('/')
    }
  }

  const commonClasses = cn(
    buttonVariants({
      variant: checkActiveNav(href) ? 'secondary' : 'ghost',
      size: 'sm',
    }),
    'h-12 justify-start text-wrap rounded-none px-6',
    'hover:bg-gradient-to-r hover:from-[var(--brand-color-TOP)] hover:to-[var(--brand-color-BOTTOM)] hover:text-white',
    subLink && 'h-10 w-full border-l border-l-slate-500 px-2',
    checkActiveNav(href) && 'bg-blue-600 text-white'
  )

  return isLogout ? (
    <button onClick={handleClick} className={commonClasses}>
      <div className='mr-2'>{icon}</div>
      {title}
    </button>
  ) : (
    <Link to={href} onClick={closeNav} className={commonClasses}>
      <div className='mr-2'>{icon}</div>
      {title}
      {label && (
        <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
          {label}
        </div>
      )}
    </Link>
  )
}

function NavLinkDropdown({
  title,
  icon,
  label,
  sub,
  closeNav,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()

  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href))

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'group h-12 w-full justify-start rounded-none px-6'
        )}
      >
        <div className='mr-2'>{icon}</div>
        {title}
        {label && (
          <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180'
          )}
        >
          <IconChevronDown stroke={1} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className='collapsibleDropdown' asChild>
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className='my-1 ml-8'>
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

function NavLinkIcon({
  title,
  icon,
  label,
  href,
  isLogout,
  closeNav,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    closeNav()
    if (isLogout) {
      dispatch(logout())
      navigate('/')
    }
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        {isLogout ? (
          <button
            onClick={handleClick}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-12 w-12'
            )}
          >
            {icon}
            <span className='sr-only'>{title}</span>
          </button>
        ) : (
          <Link
            to={href}
            className={cn(
              buttonVariants({
                variant: checkActiveNav(href) ? 'secondary' : 'ghost',
                size: 'icon',
              }),
              'h-12 w-12'
            )}
          >
            {icon}
            <span className='sr-only'>{title}</span>
          </Link>
        )}
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {title}
        {label && <span className='ml-auto text-muted-foreground'>{label}</span>}
      </TooltipContent>
    </Tooltip>
  )
}

function NavLinkIconDropdown({
  title,
  icon,
  label,
  sub,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href))

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className={cn(
                'h-12 w-12 text-white transition-colors duration-200',
                isChildActive
                  ? 'bg-gradient-to-r from-[var(--brand-color-TOP)] to-[var(--brand-color-BOTTOM)]'
                  : 'hover:bg-gradient-to-r hover:from-[var(--brand-color-TOP)] hover:to-[var(--brand-color-BOTTOM)]'
              )}
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}
          {label && (
            <span className="ml-auto text-muted-foreground">{label}</span>
          )}
          <IconChevronDown
            size={18}
            className="-rotate-90 text-muted-foreground"
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href, isLogout }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            {isLogout ? (
              <button
                onClick={() => {
                  dispatch(logout())
                  navigate('/')
                }}
                className={cn(
                  'w-full px-2 py-1 flex items-center rounded-md text-left',
                  'hover:bg-gradient-to-r hover:from-[var(--brand-color-TOP)] hover:to-[var(--brand-color-BOTTOM)] hover:text-white'
                )}
              >
                {icon}
                <span className="ml-2 max-w-52 text-wrap">{title}</span>
              </button>
            ) : (
              <Link
                to={href}
                className={cn(
                  'px-2 py-1 rounded-md transition-colors flex items-center',
                  checkActiveNav(href) &&
                    'bg-gradient-to-r from-[var(--brand-color-TOP)] to-[var(--brand-color-BOTTOM)] text-white'
                )}
              >
                {icon}
                <span className="ml-2 max-w-52 text-wrap">{title}</span>
                {label && <span className="ml-auto text-xs">{label}</span>}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
