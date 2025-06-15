'use client'

import { HTMLAttributes, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import Cookies from 'js-cookie'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PinInput, PinInputField } from '@/components/custom/pin-input'
import { useAuth } from '@/hooks/api-hooks/auth/useAuth.ts'

interface OtpFormProps extends HTMLAttributes<HTMLDivElement> {
  defaultPhone?: string
}

const formSchema = z.object({
  otp: z.string().min(6, 'Valid one-time password is required'),
})

type FormData = z.infer<typeof formSchema>

export function OtpForm({ className, ...props }: Readonly<OtpFormProps>) {
  const [isLoading, setIsLoading] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [phone, setPhone] = useState("true")
  const { verifyPhone } = useAuth()

  useEffect(() => {
    const storedPhone = Cookies.get('signup_phone')
    if (storedPhone) {
      setPhone(storedPhone)
    }
  }, [])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
    mode: 'onChange',
  })

  const { control, handleSubmit, setValue } = form

  const onFormSubmit = async (data: FormData): Promise<void> => {
    setIsLoading(true)
    try {
      await verifyPhone.mutateAsync({
        otp: data.otp,
        phoneNumber: phone,
      })
    } catch (error) {
      console.error('OTP verification error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
          {/* OTP FIELD */}
          <FormField
            control={control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP Code</FormLabel>
                <FormControl>
                  <PinInput
                    {...field}
                    value={field.value}
                    onChange={(val) => {
                      setValue('otp', val)
                      field.onChange(val)
                    }}
                    className='flex h-10 justify-between'
                    onComplete={() => setDisabledBtn(false)}
                    onIncomplete={() => setDisabledBtn(true)}
                  >
                    {Array.from({ length: 6 }, (_, i) => (
                      <PinInputField
                        key={i}
                        component={Input}
                        className={
                          form.getFieldState('otp').invalid
                            ? 'border-red-500'
                            : ''
                        }
                      />
                    ))}
                  </PinInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT BUTTON */}
          <Button
            className='w-full transform rounded-xl px-8 py-6 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
            style={{
              background:
                'linear-gradient(to right, var(--brand-color-TOP), var(--brand-color-BOTTOM))',
            }}
            type='submit'
            disabled={disabledBtn || isLoading}
            loading={isLoading}
          >
            Verify
          </Button>
        </form>
      </Form>
    </div>
  )
}
