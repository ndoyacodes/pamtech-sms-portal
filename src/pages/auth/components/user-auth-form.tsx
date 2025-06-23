import { HTMLAttributes } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {  Mail, Eye, EyeOff, Lock } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/api-hooks/auth/useAuth'
// import { Check } from 'lucide-react'
// import useIsAuthenticated from '@/hooks/use-is-authenticated'
// import useAuthentication from '@/hooks/use-authentication'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(5, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {loginUser} = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const  finalData = {
      username: data.email,
      password: data.password
    }

    loginUser.mutate(finalData) 
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4 w-full'>
           <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2 w-full">
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </FormLabel>
                  <div className="relative w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className={`w-full pl-10 pr-4 py-6 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white${
                          form.formState.errors.email 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                        }`}
                      />
                    </FormControl>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <FormMessage className="mt-1 text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Password
                      </FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-muted-foreground hover:opacity-75"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative w-full">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className={`w-full pl-10 pr-10 py-6 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white ${
                            form.formState.errors.password 
                              ? 'border-red-300 bg-red-50' 
                              : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                          }`}
                        />
                      </FormControl>
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
            <Button 
            className="w-full px-8 py-6 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(to right, var(--brand-color-TOP), var(--brand-color-BOTTOM))'
                  }}
                  loading={loginUser.isPending}
                  disabled={loginUser.isPending} 
                  type="submit"
                >
              Login
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
