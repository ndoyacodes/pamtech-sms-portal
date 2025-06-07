import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { Link } from 'react-router-dom'

export default function SignIn2() {
  return (
    <div className='container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] md:w-full lg:w-full lg:p-8'>
        <div className='mb-4 flex items-center justify-center'></div>
        <Card className='py-12 px-8'>
          <div className='flex flex-col space-y-2 text-left'>
            <div className='mb-4 flex items-center justify-center py-4'>
              <img
                src='/logo.png'
                width={150}
                height={0}
                alt='pamtech logo'
                className=''
              />
            </div>

            <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
            <p className='text-sm text-muted-foreground'>
            </p>
          </div>
          <UserAuthForm />
          <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
            By clicking login, you agree to our{' '}
            <Link
              className='underline underline-offset-4 hover:text-primary'
              to={'#'}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to='#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  )
}
