import { Card } from '@/components/ui/card'
import { ResetForm} from './components/reset-password-form'

export default function ResetPassword() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0'
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
                   <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
            </div>
          
            <div className='mb-4 flex flex-col space-y-2 text-left'>
              <p className='text-sm text-muted-foreground'>
                Make your password strong and unique. It should be at least 8 characters long and include a mix of letters, numbers, and special characters.
              </p>
            </div>
            <ResetForm />
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
