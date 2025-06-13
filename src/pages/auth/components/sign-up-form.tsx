import { useState, FC } from 'react';
import { User, Mail, Phone, Check, Eye, EyeOff, LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const formSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }).email('Invalid email format'),
    password: z.string().min(7, { message: 'Password must be at least 7 characters' }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    serviceType: z.string().min(1, { message: 'Service type is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export const SignUpForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      country: '',
      serviceType: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const countries = [
    'Tanzania', 'Kenya', 'Uganda', 'Rwanda', 
    'Burundi', 'Congo', 'South Sudan',
  ];

  const serviceTypes = [
    'Postpaid', 'Prepaid'
  ];

  const onFormSubmit = async (data: FormData): Promise<void> => {
    console.log('Form data ready for submission:', data);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Account created successfully!');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className='container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0'>
       <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[580px] md:w-full lg:w-full lg:p-8'>
         <div className='mb-4 flex items-center justify-center py-4'>
      <img
        src='/logo.png'
        width={150}
        height={0}
        alt='company logo'
      />
    </div>
    
    <div className="flex justify-center flex-col items-center text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
      <p className="text-gray-600">Join us and get started today</p>
    </div>
<div className="max-w-md lg:max-w-xl mx-auto">
      <Card className="py-12 px-8">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 w-full">
          {/* Name Row - Fixed structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="space-y-2 w-full">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
              <div className="relative group w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  id="firstName"
                  
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                    errors.firstName
                      ? 'bg-white'
                      : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                  }`}
                  {...register('firstName')}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
              </div>
            </div>

            <div className="space-y-2 w-full">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
              <div className="relative group w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  id="lastName"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                    errors.lastName
                      ? 'bg-white'
                      : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                  }`}
                  {...register('lastName')}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>
          </div>

          {/* Email - Full width */}
          <div className="space-y-2 w-full">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative group w-full">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
              <input
                type="email"
                id="email"
                className={`w-full pl-11 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.email
                    ? 'bg-white'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                }`}
                {...register('email')}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          {/* Phone Number - Full width */}
          <div className="space-y-2 w-full">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative group w-full">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
              <input
                type="tel"
                id="phoneNumber"
                className={`w-full pl-11 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.phoneNumber
                    ? ' bg-white'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                }`}
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
            </div>
          </div>

          {/* Password Fields - Full width */}
          <div className="space-y-2 w-full">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative group w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full pl-4 pr-11 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.password
                    ? ' bg-white'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                }`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <div className="space-y-2 w-full">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative group w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className={`w-full pl-4 pr-11 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.confirmPassword
                    ? 'bg-white'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                }`}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Dropdowns - Full width */}
          <div className="space-y-2 w-full">
            <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
            <select
              id="country"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white ${
                errors.country
                  ? 'bg-white'
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              {...register('country')}
            >
              <option value="">Select your country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>}
          </div>

          <div className="space-y-2 w-full">
            <label htmlFor="serviceType" className="text-sm font-medium text-gray-700">Service Type</label>
            <select
              id="serviceType"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white ${
                errors.serviceType
                  ? 'bg-white'
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              {...register('serviceType')}
            >
              <option value="">Select service type</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType.message}</p>}
          </div>

          {/* Submit Button - Full width */}
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 mt" style={{ background: 'var(--brand-color)' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            {!isSubmitting && <Check className="h-4 w-4 ml-2 inline" />}
          </button>

          {/* Footer Links */}

          <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                 Already have an account? <Link to='/sign-in' className='text-primary'>Sign in!</Link>
                </span>
              </div>
            </div>
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
            By clicking  Create Account, you agree to our{' '}
            <Link
              className='underline underline-offset-4 hover:text-primary'
              to={'#'}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to='#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p>


        </form>
        </Card>
      </div>
    
      </div>
    </div>
  );
};