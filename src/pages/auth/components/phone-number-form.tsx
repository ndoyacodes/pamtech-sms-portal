import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/api-hooks/auth/useAuth'
import {  Phone } from 'lucide-react';

interface ForgotFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  phone: z.string().min(1, { message: 'Phone number is required' }),
});

export function PhoneNumberForm({ className, ...props }: ForgotFormProps) {
  const {forgetPassword} =  useAuth();
  const navigate = useNavigate();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    forgetPassword.mutateAsync(data);
  }

  if (forgetPassword.isSuccess) {
    navigate('/password-reset/:token', {
      state: { phone: form.getValues('phone') }
    });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel className="flex items-center gap-2">
                    Phone Number
                  </FormLabel>
                  <div className="relative w-full">
                    <Input
                      type="tel"
                      className={`w-full pl-10 pr-4 py-6 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white${
                        form.formState.errors.phone
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }`}
                      {...field}
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <FormMessage className="mt-1 text-sm text-red-500" />
                </FormItem>
              )}
            />
            <Button 
              className="w-full px-8 py-6 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-4 font-size-lg"
              style={{  
                background: 'linear-gradient(to right, var(--brand-color-TOP), var(--brand-color-BOTTOM))' 
              }} 
              loading={forgetPassword.isPending}
              disabled={forgetPassword.isPending}

            >
              Send OTP
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}