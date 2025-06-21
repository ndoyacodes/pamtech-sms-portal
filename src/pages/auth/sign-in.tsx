import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Link } from 'react-router-dom'

export default function SignIn2() {
  return (
    <div className='container grid h-svh flex-col items-center justify-center  lg:max-w-none lg:px-0'
     style={{ backgroundColor: "var(--background-color)" }}
    > 
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[580px] lg:p-8'>
                
              <Card className='py-12 px-8'>
                <div className='mb-1 flex items-center justify-center py-4'>
              <img
                src='/logo.png'
                width={150}
                height={0}
                alt='pamtech logo'
                className=''
              />
            </div>
            <div className="flex justify-center flex-col items-center text-center mb-6">
                   <h1 className="text-2xl font-bold text-gray-900 mb-2">User login</h1>
                   <p className="text-gray-600">Welcome back</p>
                </div>
              <div className='flex flex-col space-y-2 text-left'>

                <p className='text-sm text-muted-foreground'></p>
              </div>
              <UserAuthForm />
            <div className='mt-4 px-8' />
              <p className='text-sm text-muted-foreground text-center'>
                Don't have an account?{' '}
                <Link
                  to='/sign-up'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Sign up
                </Link>
              </p>
            </Card>
      </div>
    </div>
  )
}
