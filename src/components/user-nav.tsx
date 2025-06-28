import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/auth/auth.slice';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/hooks/use-auth-store'
import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/api/services/dashboard/dashboard.service'


export function UserNav() {
  const navigate = useNavigate()
  const {user} =  useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ['dashboard',],
    queryFn: async () => {
      if (user?.customer) {
        const response: any = await dashboardService.getCustomerDashboardData()
      return response
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  // const [jwtToken,setJwtToken] =useAuthentication();
  const dispatch = useDispatch();
  function logOut() {
    // console.log("Jwt:"+jwtToken)
    // setJwtToken("");
    dispatch(logout());
    navigate('/')
  }
  

  return (
    <div className='flex  items-center justify-center gap-2'>
       {/* <div className="flex flex-col items-start justify-center min-w-[150px]">
          <p className="text-sm font-semibold text-blue-600">
            {dateTime.toLocaleDateString()}
          </p>
          <p className="text-sm font-semibold text-blue-600">
            {dateTime.toLocaleTimeString()}
          </p>
        </div> */}
        
      {user?.customer && (
        <div className='flex flex-row gap-2 justify-start mr-2'>
        {
          isLoading ? (
            <div className='flex h-12 items-center justify-center'>
              <div className='h-3 w-3 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-start">
            {/* <Button
            className=''
            size='sm'
            onClick={() => navigate('/sms/top-up')}
          >
            Top Up SMS
          </Button> */}
          </div>
          )
        }
        </div>
        
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
           
              <AvatarFallback >
                {user?.firstName?.charAt(0).toUpperCase()}  {user?.lastName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {user?.firstName} {user?.lastName}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
            onClick={() => navigate('/profile')}
            >
              Profile
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            
         
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logOut()}>
            Sign out
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
