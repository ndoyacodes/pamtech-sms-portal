import { HTMLAttributes } from 'react'
import { cn, decodeBase64 } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/api-hooks/auth/useAuth'
import { useParams, useSearchParams } from 'react-router-dom'

interface ResetFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export function ResetForm({ className, ...props }: ResetFormProps) {
  const { reset } = useAuth()
  const { token } = useParams();
  const [ searchParams ] = useSearchParams()
  const email = searchParams.get('userid') || ''

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const p = {
      password: data.password
    }

    let t = ''
    if (token) t = token

    const d = {
      token: t,
      email: decodeBase64(email),
      data: p
    }

    console.log(d)

    reset.mutateAsync(d);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder='' {...field} className='bg-white'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder='' {...field} className='bg-white' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-2'
              loading={reset.isPending}
              disabled={reset.isPending}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}