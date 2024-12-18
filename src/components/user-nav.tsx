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
import { useNavigate } from 'react-router-dom';
import { useTheme } from './theme-provider';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';
import { setAccount } from '@/store/slices/account.slice';
import { stat } from 'fs';
// import useAuthentication from '@/hooks/use-authentication';

export function UserNav() {
  const navigate = useNavigate();
  const dispatch =  useAppDispatch();
  const account =  useAppSelector(state=> state.accaunt.account);
  // const [jwtToken,setJwtToken] =useAuthentication();
  const { jwtToken,setJwtToken } = useTheme()
  function logOut(){
    console.log("Jwt:"+jwtToken)
    setJwtToken("");
    navigate("/sign-in");
  }

  const switchView = () => {
   dispatch(setAccount({account: true}))
  }


  return (
   <div className='flex  items-center justify-center gap-2'>
   {
    account && (  <div className='flex flex-col justify-start'>
      <span className='font-bold'>Balance: 400000</span>
      <Button className='' size="sm">Top up</Button>
   </div>)
   }
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>satnaing</p>
            <p className='text-xs leading-none text-muted-foreground'>
              satnaingdev@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={()=>switchView()}
          >
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
        <DropdownMenuItem onClick={()=>logOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>
  )
}
