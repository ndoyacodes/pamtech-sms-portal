import { Card } from '@/components/ui/card'
import { ForgotForm } from './components/forgot-form'
import { Link } from 'react-router-dom'

export default function ResendLink() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0 bg-blue'
      style={{ backgroundImage: `linear-gradient(to left, var(--brand-color-right-inside), var(--brand-color-left-inside))`, }}
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
                   <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            </div>
          
            <div className='mb-4 flex flex-col space-y-2 text-left'>
              <p className='text-sm text-muted-foreground'>
                Make sure to enter the email address associated with your account. You will receive a new link to reset your password.
              </p>
            </div>
            <ForgotForm />
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
              </div>
            </div>
            <div className='mt-4 px-8' />
              {/* <p className='text-sm text-muted-foreground text-center'>
                Did not receive the email?{' '}
                <Link
                  to='/resend-new-link'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Resend 
                </Link>
              </p> */}
              <div className='mt-4 px-8' />
              <p className='text-sm text-muted-foreground text-center'>
                Remember the password?{' '}
                <Link
                  to='/sign-in'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Sign in
                </Link>
              </p>
          </Card>
        </div>
      </div>
    </>
  )
}
