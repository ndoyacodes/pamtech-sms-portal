import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/store-hooks'
import { setAccount } from '@/store/slices/account.slice'
import { useAuthStore } from '@/hooks/use-auth-store'


const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 2
  }).format(amount);
};


export function UserNav() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const account = useAppSelector((state) => state.accaunt.account);
  const {user} =  useAuthStore();

  // const [jwtToken,setJwtToken] =useAuthentication();
  function logOut() {
    // console.log("Jwt:"+jwtToken)
    // setJwtToken("");
    navigate('/sign-in')
  }

  const switchView = () => {
    dispatch(setAccount({ account: true }))
  }

  return (
    <div className='flex  items-center justify-center gap-2'>
      {account && (
        <div className='flex flex-row gap-2 justify-start'>
          <span className='font-bold flex flex-col'>
            <span className='text-xs'>Balance</span>
            <span className='text-sm'>
          {formatCurrency(40000)}
            </span>
          </span>

          <Button
            className=''
            size='sm'
            onClick={() => navigate('/sms/top-up')}
          >
            Top up
          </Button>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
              <AvatarFallback>
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
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchView()}>
              Switch View
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logOut()}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
