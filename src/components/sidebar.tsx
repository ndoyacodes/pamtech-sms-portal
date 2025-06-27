import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks } from '@/data/sidelinks'
import { sidelinksAccount } from '@/data/accounts-sidelinks'
import type { SideLink as OriginalSideLink } from '@/data/sidelinks'

type SideLink = OriginalSideLink & {
  isLogout?: boolean
}
import { useAuthStore } from '@/hooks/use-auth-store'
import { logout } from '@/store/slices/auth/auth.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)
  const { user } = useAuthStore()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (item: SideLink) => {
    if (item.isLogout) {
      dispatch(logout());
      navigate('/');
    } else {
      navigate(item.href);
    }
  };

  const sidelinksData = user?.customer ? sidelinksAccount : sidelinks
  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
    `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh 
     ${isCollapsed ? 'md:w-14' : 'md:w-64'} 
     bg-background dark:bg-background`, // Ensures both light and dark mode use theme
    className
  )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-opacity duration-300 ${navOpened ? 'opacity-50' : 'opacity-0 pointer-events-none'} bg-black md:hidden`}
        style={{ zIndex: 40 }}
      />
      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className='z-50 flex justify-between px-4 py-3 shadow-sm md:px-4'
        >
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            

            <div
              className={`flex flex-row justify-center truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              {/* Logo */}
              <div className="flex items-center gap-2 pointer">
              <a href="/">
                <img src="/logo.png" alt="Pamtech Logo" className="h-6 md:h-10 lg:h-12 pointer" />
              </a>
            </div>
              
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>
        {/* Navigation links */}
        <Nav
            id='sidebar-menu'
            className={`z-40 h-full flex-1 overflow-auto bg-white dark:bg-zinc-900
              ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
            closeNav={() => setNavOpened(false)}
            isCollapsed={isCollapsed}
            links={sidelinksData}
            onItemClick={handleClick}
          />

       

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      
      </Layout>
    </aside>
  )
}
