import { Card } from '@/components/ui/card'
// import { ForgotForm } from './components/forgot-form'
import { ForgotForm } from './components/forgot-form'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center  lg:max-w-none lg:px-0'
        style=
        {{
          backgroundImage: `linear-gradient(to bottom, var(--brand-color-right), var(--brand-color-left)), url('/lady.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full max-w-2xl">
           <Card className="p-6 sm:p-8 md:p-10">
            
            <div className='mb-1 flex items-center justify-center py-4'>
              <img
                src='/logo.png'
                width={120}
                height={0}
                alt='pamtech logo'
                className=''
              />
            </div>
              <div className="flex justify-center flex-col items-center text-center mb-6">
                   <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Forgot Password?</h1>
            </div>
          
            <div className='mb-4 flex flex-col space-y-2 text-left'>
              <p className='text-sm text-muted-foreground dark:text-white'>
                Enter your registered email address and you will receive a link to reset your password.
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
              <p className='text-sm text-muted-foreground text-center dark:text-white'>
                Remember the password?{' '}
                <Link
                  to='/sign-in'
                   className="text-blue-600 underline hover:text-blue-300">
                  Sign in
                </Link>
              </p>
          </Card>
        </div>
      </div>
    </>
  )
}
