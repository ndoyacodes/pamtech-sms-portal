import { Card } from '@/components/ui/card'
import { ResetForm } from '@/pages/auth/components/reset-password.tsx'

export default function ForgotPassword() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
         
          <Card className='p-6'>
          <div className='mb-4 flex items-center justify-center py-4'>
            <img src="/logo.png" alt="pamtech logo" className='' />
          </div>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                Reset Password
              </h1>
              {/*<p className='text-sm text-muted-foreground'>
                Enter your registered email and <br /> we will send you a link
                to reset your password.
              </p>*/}
            </div>
            <ResetForm />
          </Card>
        </div>
      </div>
    </>
  )
}
