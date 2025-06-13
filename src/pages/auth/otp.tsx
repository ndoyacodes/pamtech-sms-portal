import { Card } from '@/components/ui/card'
import { OtpForm } from './components/otp-form'
import { Link } from 'react-router-dom'

export default function Otp() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[580px] lg:p-8'>
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
                   <p className="text-gray-600">Reset here</p>
            </div>
         
          <Card className='py-12 px-8'>
          
            <div className='mb-4 flex flex-col space-y-2 text-left'>
              <p className='text-sm text-muted-foreground'>
               Please enter the authentication code you received via SMS on your phone number.
              </p>
            </div>
            <OtpForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              Haven't received it?{' '}
              <Link
                to='/resend-new-code'
                className='underline underline-offset-4 hover:text-primary'
              >
                Resend a new code.
              </Link>
              .
            </p>
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                 Dont have an account? <Link to='/sign-up' className='text-primary'>Register Here!</Link>
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
