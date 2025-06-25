import { Card } from '@/components/ui/card'
import { OtpForm } from './components/otp-form'
import { Link } from 'react-router-dom'

export default function Otp() {
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
                   <h1 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Verify Phone number</h1>
            </div>

            <div className='mb-4 flex flex-col space-y-2 text-left'>
              <p className='text-sm text-muted-foreground dark:text-white'>
               Please enter the authentication code you received via SMS on your phone number.
              </p>
            </div>
            <OtpForm/>
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground dark:text-white'>
              Haven't received it?{' '}
              <Link
                to='/resend-otp'
                className='underline underline-offset-4 hover:text-primary'>
                Verify phone number.
              </Link>
            </p>
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground dark:text-white'>
                 Dont have an account? <Link to='/sign-up' className='text-primary dark:text-blue-300'>Register Here!</Link>
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
