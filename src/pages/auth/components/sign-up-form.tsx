import { HTMLAttributes } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  User,
  Building2,
  Mail,
  Globe,
  Phone,
  Check,
  Upload,
  Languages,
  Shield,
  UserCircle,
  Building,
} from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { PasswordInput } from '@/components/custom/password-input'
import { Button } from '@/components/custom/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/api-hooks/auth/useAuth'

const StepIndicator = ({ stepNumber, currentStep, title, icon: Icon }: any) => {
  const isCompleted = currentStep > stepNumber
  const isActive = currentStep === stepNumber

  return (
    <div className='flex items-center'>
      <div className='relative'>
        <div
          className={`
            flex h-12 w-12 items-center justify-center rounded-full border-2 
            transition-all duration-500
            ${isActive ? 'border-primary bg-primary text-white' : ''}
            ${isCompleted ? 'border-green-500 bg-green-500 text-white' : ''}
            ${!isActive && !isCompleted ? 'border-gray-300 text-gray-500' : ''}
          `}
        >
          {isCompleted ? (
            <Check className='h-6 w-6' />
          ) : (
            <Icon className='h-5 w-5' />
          )}
        </div>
        <div className='absolute -bottom-8 left-1/2 w-max -translate-x-1/2'>
          <span
            className={`text-sm font-medium
              ${isActive ? 'text-black dark:text-white' : ''}
              ${isCompleted ? 'text-green-500' : ''}
              ${!isActive && !isCompleted ? 'text-gray-500' : ''}
            `}
          >
            {title}
          </span>
        </div>
      </div>
      {stepNumber < 4 && (
        <div
          className={`
            mx-2 h-0.5 w-20
            transition-all duration-500
            ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
          `}
        />
      )}
    </div>
  )
}

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string()
      .min(7, { message: 'Password must be at least 7 characters' }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    timezone: z.string().min(1, { message: 'Timezone is required' }),
    language: z.string().min(1, { message: 'Language is required' }),
    companyName: z.string().min(1, { message: 'Company name is required' }),
    website: z
      .string()
      .url({ message: 'Please enter a valid URL' })
      .or(z.string().length(0)),
    customerType: z.enum(['POSTPAID', 'PREPAID']),
    countryCode: z.string().min(1, { message: 'Country code is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    status: z.boolean(),
    kycFile: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [step, setStep] = useState(1)
  // const [imageBase64, setImageBase64] = useState<string | null>(null)
  const { registerCustomer } = useAuth()
  //@ts-ignore
  var aryIanaTimeZones = Intl.supportedValuesOf('timeZone')

  // const handleImageChange = (file: File) => {
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     if (reader.result) {
  //       setImageBase64(reader.result.toString())
  //     }
  //   }
  //   reader.readAsDataURL(file)
  // }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      timezone: '',
      language: '',
      companyName: '',
      website: '',
      customerType: 'POSTPAID',
      countryCode: '',
      phoneNumber: '',
      status: true,
      kycFile: '',
    },
    mode: 'onChange',
  })

  const validateStep = async () => {
    const fields: any = {
      1: ['email', 'password', 'confirmPassword'],
      2: ['firstName', 'lastName', 'countryCode', 'phoneNumber'],
      3: ['companyName', 'customerType'],
      4: ['language', 'timezone'],
    }

    const currentFields = fields[step]
    const output = await form.trigger(currentFields)
    return output
  }

  const onSubmit = (data: any) => {
    console.log(data.kycFile)
    const formData = new FormData()

    Object.entries({
      ...data,
    }).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    registerCustomer.mutate(formData)
  }

  const nextStep = async () => {
    const isStepValid = await validateStep()
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, 4))
    }
  }
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='space-y-4 '>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        className='pl-9'
                        placeholder='your@email.com'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Shield className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <PasswordInput
                        className='pl-9'
                        placeholder='********'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Shield className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <PasswordInput
                        className='pl-9'
                        placeholder='********'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 2:
        return (
          <div className='space-y-4 animate-in slide-in-from-right-5'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input className='pl-9' placeholder='John' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input className='pl-9' placeholder='Doe' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='countryCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Globe className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input className='pl-9' placeholder='+1' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          className='pl-9'
                          placeholder='(255) 000-0000'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className='space-y-4 animate-in slide-in-from-right-5'>
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Building2 className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        className='pl-9'
                        placeholder='Your Company Ltd.'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (Optional)</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Globe className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        className='pl-9'
                        placeholder='https://example.com'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='customerType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select account type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='POSTPAID'>Postpaid</SelectItem>
                      <SelectItem value='PREPAID'>Prepaid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 4:
        return (
          <div className='space-y-4 animate-in slide-in-from-right-5'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='language'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select language' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='en'>English</SelectItem>
                        <SelectItem value='es'>Spanish</SelectItem>
                        <SelectItem value='fr'>French</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='timezone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select timezone' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {aryIanaTimeZones.map((timeZone: string) => (
                          <SelectItem key={timeZone} value={timeZone}>
                            {timeZone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='kycFile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KYC Document</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='file'
                        className='pl-9'
                         accept='application/pdf'
                        //@ts-ignore
                        onChange={(e) => field.onChange(e.target.files[0])}
                      />
                      <Upload className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='mb-12 flex items-center justify-center px-4'>
        <StepIndicator
          stepNumber={1}
          currentStep={step}
          title='Account'
          icon={UserCircle}
        />
        <StepIndicator
          stepNumber={2}
          currentStep={step}
          title='Personal'
          icon={User}
        />
        <StepIndicator
          stepNumber={3}
          currentStep={step}
          title='Company'
          icon={Building}
        />
        <StepIndicator
          stepNumber={4}
          currentStep={step}
          title='Settings'
          icon={Languages}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderStep()}

          <div className='flex justify-between pt-8'>
            {step > 1 && (
              <Button
                type='button'
                variant='outline'
                onClick={prevStep}
                className='transition-all duration-300 hover:bg-gray-100'
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                type='button'
                onClick={nextStep}
                className={` transition-all duration-300  ${step === 1 ? 'w-full' : ''}`}
              >
                Continue
              </Button>
            ) : (
              <Button
                type='submit'
                className='ml-2 w-full transition-all duration-300 hover:bg-green-700'
                loading={registerCustomer.isPending}
                disabled={registerCustomer.isPending}
              >
                Create Account
              </Button>
            )}
          </div>

          <div className='relative mt-6'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Already have an account?{'   '}{' '}
                <Link to='/sign-in'>Login here!</Link>
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
