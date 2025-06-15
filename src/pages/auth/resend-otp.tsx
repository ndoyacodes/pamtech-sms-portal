import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { PhoneNumberForm } from './components/phone-number-form'

export default function ResendOtp() {
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
                   <h1 className="text-2xl font-bold text-gray-900 mb-2">Resend OTP</h1>
                   <p className="text-gray-600">Please enter your phone number</p>
            </div>

          <Card className='py-12 px-8'>
          
            <div className='mb-4 flex flex-col space-y-2 text-left'>
              <p className='text-sm text-muted-foreground'>
                Make sure to enter the phone number is correct. You will receive an OTP to verify your phone number.
              </p>
            </div>
            <PhoneNumberForm />
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Did not receive an OTP?
                 <Link to='/resend-otp' className='text-primary'> Resend OTP</Link>
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
