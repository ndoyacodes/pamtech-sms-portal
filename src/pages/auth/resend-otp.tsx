import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { PhoneNumberForm } from './components/phone-number-form'

export default function ResendOtp() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0'
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
                   <h1 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Resend OTP</h1>
            </div>
          
            <div className='mb-4 flex flex-col space-y-2 text-left'>
              <p className='text-sm text-muted-foreground dark:text-white'>
                Make sure to enter the phone number is correct. You will receive an OTP to verify your phone number.
              </p>
            </div>
            <PhoneNumberForm />
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground dark:text-white'>
                  Did not receive an OTP?
                 <Link to='/resend-otp' className='text-primary dark:text-blue-300'> Resend OTP</Link>
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
